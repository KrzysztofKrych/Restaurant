import Redux from "redux"
import Order from "../../../api/models/Order"
import OrderStatus from "../../../api/models/OrderStatus"
enum ActionType {
    ADD_ORDER_SUCCESS_ACTION = "ADD_ORDER_SUCCESS_ACTION",
    REMOVE_ORDER_SUCCESS_ACTION = "REMOVE_ORDER_SUCCESS_ACTION",
    CHANGE_ORDER_STATUS_SUCCESS_ACTION = "CHANGE_ORDER_STATUS_SUCCESS_ACTION"
}

export class AddOrderSuccessAction implements Redux.Action {
    public readonly type = ActionType.ADD_ORDER_SUCCESS_ACTION
    public readonly payload: { order: Order }
    public constructor(order: Order){
        this.payload = { order }
    }
}
export class RemoveOrderSuccessAction implements Redux.Action {
    public readonly type = ActionType.REMOVE_ORDER_SUCCESS_ACTION
    public readonly payload: { id: string }
    constructor(id: string ){
        this.payload = { id }
    }
}
export class ChangeOrderStatusSuccessAction implements Redux.Action {
    public readonly type = ActionType.CHANGE_ORDER_STATUS_SUCCESS_ACTION
    public readonly payload: { id: string, status: OrderStatus }
    constructor(id: string, status: OrderStatus  ){
        this.payload = { id, status }
    }
}

export default ActionType;