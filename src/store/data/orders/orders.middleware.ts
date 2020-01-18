
import ActionType from "./orders.actions";
import { store } from "../..";
import Order from "../../../api/models/Order";
import OrderStatus from "../../../api/models/OrderStatus";

export const addOrderSuccessAction = (order: Order) => {
    store.dispatch({ type: ActionType.ADD_ORDER_SUCCESS_ACTION, payload: { order } })
}
export const removeOrderSuccessAction = (id: string) => {
    store.dispatch({ type: ActionType.REMOVE_ORDER_SUCCESS_ACTION, payload: { id } })
}
export const changeOrderStatusSuccessAction = (id: string, status: OrderStatus) => {
    store.dispatch({ type: ActionType.CHANGE_ORDER_STATUS_SUCCESS_ACTION, payload: { id, status } })
}
