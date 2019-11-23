import Redux from "redux";
import userReducer, {initialUserState, UserState, UserAction } from "./data/user/user.reducer";
import ingredientReducer, {initialIngredientsState, IngredientsState, IngredientsAction } from "./data/ingredients/ingredients.reducer";
import notificationReducer, {initialNotificationState, NotificationState, NotificationAction } from "./data/notification/notification.reducer";
import dishesReducer, {initialDishesState, DishesState, DishesAction } from "./data/dishes/dishes.reducer";
import ordersReducer, {initialOrderState, OrdersState, OrdersAction } from "./data/orders/orders.reducer";


export interface RootState {
    user: UserState
    ingredients: IngredientsState
    notification: NotificationState
    dishes: DishesState
    orders: OrdersState
}

export type RootAction = UserAction | IngredientsAction | NotificationAction | OrdersAction | DishesAction;

export const rootInitialState: RootState = {
    user: initialUserState,
    ingredients: initialIngredientsState,
    notification: initialNotificationState,
    dishes: initialDishesState,
    orders: initialOrderState
};

const rootReducer: Redux.Reducer<RootState, RootAction> = (store = rootInitialState, action) => {
    return {
        user: userReducer(store.user, action as UserAction),
        ingredients: ingredientReducer(store.ingredients, action as IngredientsAction),
        notification: notificationReducer(store.notification,action as NotificationAction),
        dishes: dishesReducer(store.dishes, action as DishesAction),
        orders: ordersReducer(store.orders, action as OrdersAction)
    };
}


export default rootReducer;
