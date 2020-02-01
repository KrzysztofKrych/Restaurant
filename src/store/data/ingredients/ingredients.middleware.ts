
import { store } from "../../index";
import ActionType from "./ingredients.actions";
import Ingredient from "../../../api/models/Ingredient";
import { getIngredients, addIngredient, removeIngredient } from "../../repositories/ingredientsRepository";
import { setIngredientsToDishes } from "../../repositories/dishesRepository";
import { refreshIngredientsInDishes } from "../dishes/dishes.middleware";

export const getIngredientsActionInit = async () => {
    const ingredients = await getIngredients();
    const {dishes: {dishes}} = store.getState();
    setIngredientsToDishes(ingredients, dishes)
    store.dispatch({ type: ActionType.SET_INGREDIENTS_SUCCESS_ACTION, payload: { ingredients } });
}

export const addIngredientActionSuccess = async (ingredient: Ingredient, successCallback: () => void) => {
    const addedId = await addIngredient(ingredient);
    if(addedId){
        ingredient.id = addedId
        store.dispatch({ type: ActionType.ADD_INGREDIENT_SUCCESS_ACTION, payload: { ingredient } })
        successCallback();
    }
}

export const editIngredientNameActionSuccess = (newName: string, id: string) => {
    store.dispatch({ type: ActionType.EDIT_INGREDIENT_NAME_SUCCESS_ACTION, payload: { newName, id } })
}

export const deleteIngredientNameActionSuccess = async (id: string) => {
    const removed = await removeIngredient(id);
    if(removed){
        refreshIngredientsInDishes(id)
        store.dispatch({ type: ActionType.DELETE_INGREDIENT_NAME_SUCCESS_ACTION, payload: { id } })
    }
}

export const addAvatarToIngredientActionSuccess = (avatar: string, id:string) => {
    store.dispatch({ type: ActionType.ADD_AVATAR_TO_INGREDIENT_SUCCESS_ACTION, payload: { avatar,id } })
}
