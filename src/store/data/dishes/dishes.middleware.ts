
import { store } from "../../index";
import ActionType from "./dishes.actions";
import Dish from "../../../api/models/Dish";
import Ingredient from "../../../api/models/Ingredient";
import { getDishes, addDish, removeDish } from "../../repositories/dishesRepository";
import { setDishesToOrders } from "../../repositories/ordersRepository";


export const getDishesActionInit = async () => {
    const dishes = await getDishes();
    const {orders: {orders}} = store.getState();
    setDishesToOrders(dishes, orders)
    store.dispatch({ type: ActionType.SET_DISHES_SUCCESS_ACTION, payload: { dishes } });
}

export const addDishActionSuccess = async (dish: Dish) => {
    const addedId = await addDish(dish);
    if(addedId){
        dish.id = addedId;
        store.dispatch({ type: ActionType.ADD_DISH_SUCCESS_ACTION, payload: { dish } });
    }
}

export const removeDishActionSuccess = async (id: string) => {
    const removed = await removeDish(id);
    if(removed){
        store.dispatch({ type: ActionType.REMOVE_DISH_SUCCESS_ACTION, payload: { id } })
    }
}

export const addIngredientToDishActionSuccess = (id: string, ingredient:Ingredient) => {
    store.dispatch({ type: ActionType.ADD_INGREDIENT_TO_DISH_SUCCESS_ACTION, payload: { id, ingredient } })
}
