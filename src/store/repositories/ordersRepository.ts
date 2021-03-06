import { db } from "../../config/firebaseConfig"
import Order from "../../api/models/Order";
import Dish from "../../api/models/Dish";
import { addDishToOrderActionSuccess } from "../data/orders/orders.middleware";
import { getUserId } from "../../helpers/helpers";
import OrderStatus from "../../api/models/OrderStatus";

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
        return { id: docRef.id,dishesId: dishesId }
    }).catch((error) => {
        console.log(error);
        return {id: "0", dishesId: []}
    })
}

const removeOrder = async (id: string) => {
    return await db.collection("orders").doc(id).delete().then(() => true
    ).catch((error) => {
        console.log(error);
        return false
    })
}

const addDishToOrder = async (order:Order, id: string) => {
    let { dishesId } = order;
    dishesId = dishesId.includes(id) ? 
    dishesId = dishesId.filter(dishId => dishId !== id) :
    dishesId = dishesId.concat(id);

    return await db.collection("orders").doc(order.id).update({
        dishesId
    }).then(() => dishesId)
    .catch((error) => {
        console.log(error);
        return []
    })
}

const removeDishFromOrder = async (order:Order, id: string) => {
    let { dishesId } = order;
    dishesId = dishesId.filter(dishId => dishId !== id);

    return await db.collection("orders").doc(order.id).update({
        dishesId
    }).then(() => {
        return dishesId
    })
    .catch((error) => {
        console.log(error);
        return []
    })
}

const updateOrderStatus = async (id:string, status: OrderStatus) => {
    return await db.collection("orders").doc(id).update({
        status
    }).then(response => {
        return true;
    }).catch(error => {
        console.log(error);
        return false;
    })
}

const getNextOrderStatus = (status: OrderStatus) => {
    switch(status){
        case OrderStatus.ORDERED: {
            return OrderStatus.ISSUED
        }
        case OrderStatus.ISSUED: {
            return OrderStatus.PAID
        }
        case OrderStatus.PAID: {
            return OrderStatus.ARCHIVED
        }
        default: {
            return OrderStatus.ORDERED
        }
    }
}

export {
    getOrders,
    setDishesToOrders,
    addOrder,
    removeOrder,
    removeDishFromOrder,
    addDishToOrder,
    updateOrderStatus,
    getNextOrderStatus
}