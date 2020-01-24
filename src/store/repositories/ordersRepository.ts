import { db } from "../../config/firebaseConfig"
import { store } from "../index";
import Order from "../../api/models/Order";
import Dish from "../../api/models/Dish";
import { addDishToOrderActionSuccess } from "../data/orders/orders.middleware";

const getOrders = async (): Promise<Order[]> => {
    const { user: {user} } = store.getState();
    const q = db.collection("orders").where('userId', "==", user.id)
    return await q.get().then(snapshot => 
        snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                table: data.table,
                status: data.status,
                dishes: [],
                userId: data.userId,
                dishesId: data.dishesId
            }
        }
    ));
}

const setDishesToOrders = (dishes: Dish[], orders: Order[]) => {
    orders.forEach(order => {
        const dishInOrder = dishes.find(dish => order.dishesId.includes(dish.id));
        if(dishInOrder) addDishToOrderActionSuccess(order.id, dishInOrder)
    })
}


export {
    getOrders,
    setDishesToOrders
}