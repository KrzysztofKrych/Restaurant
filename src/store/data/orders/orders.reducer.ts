import Redux from "redux";


import ActionType, {
    AddOrderSuccessAction,
    RemoveOrderSuccessAction,
    ChangeOrderStatusSuccessAction,
    SetOrdersSuccessAction,
    AddDishToOrderAction,
    RefreshDishesInOrderAction
} from "./orders.actions"
import Order from "../../../api/models/Order";

export interface OrdersState {
    orders: Order[]
}


export const initialOrderState: OrdersState = {
    orders: []
}

export type OrdersAction = AddOrderSuccessAction | RemoveOrderSuccessAction | ChangeOrderStatusSuccessAction | SetOrdersSuccessAction | AddDishToOrderAction | RefreshDishesInOrderAction;

const ordersReducer: Redux.Reducer<OrdersState, OrdersAction> = (state = initialOrderState, action) => {
    if(ActionType){
        switch(action.type){
            case ActionType.SET_ORDERS_SUCCESS_ACTION: {
                return {
                    ...state,
                    orders: [...action.payload.orders]
                }
            }
            case ActionType.ADD_DISH_TO_ORDER_SUCCESS_ACTION: {
                const { id, dish, dishesId } = action.payload;
                return {
                    ...state,
                    orders: [
                        ...state.orders.filter(order => {
                            if(order.id === id){
                                const index = order.dishes.findIndex(loopedDish => dish.id === loopedDish.id);
                                if(index >= 0){
                                    order.dishes.splice(index,1)
                                }else{
                                    order.dishes.push(dish)
                                }
                                if(dishesId){
                                    order.dishesId = [...dishesId];
                                }
                            }
                            return dish;
                        })
                    ]
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
           case ActionType.REFRESH_DISHES_IN_ORDER_SUCCESS_ACTION: {
            const { orderId, dishesId } = action.payload;
            return {
                ...state,
                orders: state.orders.filter(order => {
                    if(order.id === orderId){
                        const dishes = order.dishes.filter(dish => dishesId.includes(dish.id))
                        order.dishesId = [...dishesId];
                        order.dishes = [...dishes];
                    }
                    return order;
                })
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
