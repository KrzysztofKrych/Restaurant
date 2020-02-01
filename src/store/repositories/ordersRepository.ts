import { db } from "../../config/firebaseConfig"
import Order from "../../api/models/Order";
import Dish from "../../api/models/Dish";
import { addDishToOrderActionSuccess } from "../data/orders/orders.middleware";
import { getUserId } from "../../helpers/helpers";

const getOrders = async (): Promise<Order[]> => {
    const q = db.collection("orders").where('userId', "==", getUserId())
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

const addOrder = async (order: Order) => {
    const dishesId = order.dishes.map(dish => dish.id);
    const {status, table} = order;
    const body = {
        dishesId, status, table,
        userId: getUserId()
    }
    return await db.collection("orders").add(body).then((docRef) => {
        return docRef.id
    }).catch((error) => {
        console.log(error);
        return ""
    })
}

const removeOrder = async (id: string) => {
    return await db.collection("orders").doc(id).delete().then(() => true
    ).catch((error) => {
        console.log(error);
        return false
    })
}


export {
    getOrders,
    setDishesToOrders,
    addOrder,
    removeOrder
}