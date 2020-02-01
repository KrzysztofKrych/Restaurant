
import ActionType from "./orders.actions";
import { store } from "../..";
import Order from "../../../api/models/Order";
import OrderStatus from "../../../api/models/OrderStatus";
import { getOrders, removeOrder, addOrder } from "../../repositories/ordersRepository";
import Dish from "../../../api/models/Dish";

export const getOrdersActionInit = async () => {
    const orders = await getOrders();
    store.dispatch({ type: ActionType.SET_ORDERS_SUCCESS_ACTION, payload: { orders } });
}

export const addOrderSuccessAction = async (order: Order) => {
    const addedId = await addOrder(order);
    if(addedId){
        order.id = addedId;
        store.dispatch({ type: ActionType.ADD_ORDER_SUCCESS_ACTION, payload: { order } })
    }
}
export const removeOrderSuccessAction = async (id: string) => {
    const removed = await removeOrder(id);
    if(removed){
        store.dispatch({ type: ActionType.REMOVE_ORDER_SUCCESS_ACTION, payload: { id } })
    }
}
export const changeOrderStatusSuccessAction = (id: string, status: OrderStatus) => {
    store.dispatch({ type: ActionType.CHANGE_ORDER_STATUS_SUCCESS_ACTION, payload: { id, status } })
}

export const addDishToOrderActionSuccess = (id: string, dish:Dish) => {
    store.dispatch({ type: ActionType.ADD_DISH_TO_ORDER_SUCCESS_ACTION, payload: { id, dish } })
}
