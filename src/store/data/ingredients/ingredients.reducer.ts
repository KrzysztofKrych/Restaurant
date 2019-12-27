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
    ingredients: [{name: "12323", id: Date.now() + 1},{name: "12325", id: Date.now() * Math.random() * Math.random() },{name: "12323", id: Date.now() + 2},{name: "1232", id: Date.now()+3},{name: "12ssssssssssssssssssssssssssssssssssssssssssss ssssssssssssssssssssssssss32", id: Date.now()+5},{name: "12ssssssssssssssssssssssssssssssssss", id: Date.now()+8}]
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

