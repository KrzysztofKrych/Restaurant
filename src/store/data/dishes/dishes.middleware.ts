
import { store } from "../../index";
import ActionType from "./dishes.actions";
import Dish from "../../../api/models/Dish";
import Ingredient from "../../../api/models/Ingredient";
import { getDishes } from "../../repositories/dishesRepository";


export const getDishesActionInit = async () => {
    const dishes = await getDishes()
    console.log(dishes);
    store.dispatch({ type: ActionType.SET_DISHES_SUCCESS_ACTION, payload: { dishes } });
}

export const addDishActionSuccess = (dish: Dish) => {
    store.dispatch({ type: ActionType.ADD_DISH_SUCCESS_ACTION, payload: { dish } });
}

export const removeDishActionSuccess = (dish: Dish) => {
    store.dispatch({ type: ActionType.REMOVE_DISH_SUCCESS_ACTION, payload: { dish } })
}

export const addIngredientToDishActionSuccess = (id: string, ingredient:Ingredient) => {
    store.dispatch({ type: ActionType.ADD_INGREDIENT_TO_DISH_SUCCESS_ACTION, payload: { id, ingredient } })
}
