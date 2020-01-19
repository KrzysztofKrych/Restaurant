import Redux from "redux";


import ActionType, {
    AddOrderSuccessAction,
    RemoveOrderSuccessAction,
    ChangeOrderStatusSuccessAction,
    SetOrdersSuccessAction
} from "./orders.actions"
import Order from "../../../api/models/Order";

export interface OrdersState {
    orders: Order[]
}


export const initialOrderState: OrdersState = {
    orders: []
}

export type OrdersAction = AddOrderSuccessAction | RemoveOrderSuccessAction | ChangeOrderStatusSuccessAction | SetOrdersSuccessAction;

const ordersReducer: Redux.Reducer<OrdersState, OrdersAction> = (state = initialOrderState, action) => {
    if(ActionType){
        switch(action.type){
            case ActionType.SET_ORDERS_SUCCESS_ACTION: {
                console.log(action.payload.orders)
                return {
                    ...state,
                    orders: [...action.payload.orders]
                }
            }
            case ActionType.ADD_ORDER_SUCCESS_ACTION: {
               return {
                    ...state,
                    orders: [ ...state.orders, action.payload.order ]
               }
            }
           case ActionType.REMOVE_ORDER_SUCCESS_ACTION: {
               const { id } = action.payload;
               return {
                   ...state,
                   orders: [...state.orders.filter(order => order.id !== id)]
               }
           }
           case ActionType.CHANGE_ORDER_STATUS_SUCCESS_ACTION: {
               const { status, id } = action.payload;
               return {
                   ...state,
                   orders: [...state.orders.map(order => {
                       if(order.id === id) order.status = status;
                       return order;
                   })]
               }
           }
            default: {
                return state
            }
        }
    }
    return state;
}
export default ordersReducer;
