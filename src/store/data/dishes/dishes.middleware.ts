
import { store } from "../../index";
import ActionType from "./dishes.actions";
import Dish from "../../../api/models/Dish";
import Ingredient from "../../../api/models/Ingredient";
import { getDishes, addDish, removeDish, addIngredientToDish, removeIngredientFromDish } from "../../repositories/dishesRepository";
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

export const addIngredientToDishActionSuccess = async (id: string, ingredient:Ingredient) => {
    store.dispatch({ type: ActionType.ADD_INGREDIENT_TO_DISH_SUCCESS_ACTION, payload: { id, ingredient } })
}

export const addNewIngredientToDishActionSuccess  = async (dish: Dish, ingredient:Ingredient) => {
    const { id } = dish
    const ingredientsId = await addIngredientToDish(dish, ingredient.id);
    if(ingredientsId){
        store.dispatch({ type: ActionType.ADD_INGREDIENT_TO_DISH_SUCCESS_ACTION, payload: {id , ingredient, ingredientsId } })
    }
}

export const refreshIngredientsInDishes = (id: string) => {
    const {dishes: {dishes}} = store.getState();
    dishes.forEach(async (dish) =>  {
        if(dish.ingredientsId.includes(id)){
            const ingredientsId = await removeIngredientFromDish(dish, id);
            const {id: dishId} = dish;
            store.dispatch({ type: ActionType.REFRESH_INGREDIENTS_IN_DISH_SUCCESS_ACTION, payload: {dishId, ingredientsId }})
        }
    })
}