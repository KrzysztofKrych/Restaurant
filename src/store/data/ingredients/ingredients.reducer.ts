import Redux from "redux";

import ActionType, {
    AddIngredientSuccessAction,
    addAvatarToIngredientActionSuccess,
    editIngredientNameActionSuccess,
    deleteIngredientNameActionSuccess
} from "./ingredients.actions"
import Ingredient from "../../../api/models/Ingredient";

export interface IngredientsState {
    ingredients: Ingredient[]
}

export const initialIngredientsState: IngredientsState = {
    ingredients: []
}

export type IngredientsAction = AddIngredientSuccessAction | addAvatarToIngredientActionSuccess | editIngredientNameActionSuccess | deleteIngredientNameActionSuccess;

const ingredientsReducer: Redux.Reducer<IngredientsState, IngredientsAction> = (state = initialIngredientsState, action: IngredientsAction) => {
    if(ActionType){
        switch(action.type){
            case ActionType.ADD_INGREDIENT_SUCCESS_ACTION: {
                const { ingredient } = action.payload;
                return {
                    ...state,
                    ingredients: [...state.ingredients, ingredient]
                }
            }
            case ActionType.ADD_AVATAR_TO_INGREDIENT_SUCCESS_ACTION: {
                const { avatar, id } = action.payload;
                return {
                    ...state,
                    ingredients: [...state.ingredients.filter(ingredient =>{
                        if(ingredient.id === id){
                            ingredient.avatar = avatar;
                        }
                        return ingredient;
                    })]
                }
            }
            case ActionType.EDIT_INGREDIENT_NAME_SUCCESS_ACTION: {
                const { newName, id } = action.payload;
                return {
                    ...state,
                    ingredients: [...state.ingredients.filter(ingredient =>{
                        if(ingredient.id === id){
                            ingredient.name = newName;
                        }
                        return ingredient;
                    })]
                }
            }
            case ActionType.DELETE_INGREDIENT_NAME_SUCCESS_ACTION: {
                const { id } = action.payload;
                return {
                    ...state,
                    ingredients: [...state.ingredients.filter(ingredient =>{
                        if(ingredient.id !== id){
                            return ingredient;
                        }
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
export default ingredientsReducer;

