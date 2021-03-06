import Redux from "redux";

import ActionType, {
    AddDishInitAction,
    RemoveDishInitAction,
    AddIngredientToDishAction,
    SetDishesSuccessAction,
    RefreshIngredientsInDishAction
} from "./dishes.actions"
import Dish from "../../../api/models/Dish";

export interface DishesState {
    dishes: Dish[]
}

export const initialDishesState: DishesState = {
    dishes: []
}

export type DishesAction = AddDishInitAction | RemoveDishInitAction | AddIngredientToDishAction | SetDishesSuccessAction | RefreshIngredientsInDishAction;

const dishesReducer: Redux.Reducer<DishesState, DishesAction> = (state = initialDishesState, action: DishesAction) => {
    if(ActionType){
        switch(action.type){
            case ActionType.SET_DISHES_SUCCESS_ACTION : {
                return {
                    ...state,
                    dishes: [...action.payload.dishes]
                }
            }
            case ActionType.ADD_DISH_SUCCESS_ACTION : {
                return {
                    ...state,
                    dishes: [...state.dishes, action.payload.dish]
                }
            }
            case ActionType.REMOVE_DISH_SUCCESS_ACTION : {
                const { id } = action.payload;

                return {
                    ...state,
                    dishes: [...state.dishes.filter(dish => dish.id !== id)]
                }
            }
            case ActionType.ADD_INGREDIENT_TO_DISH_SUCCESS_ACTION: {
                const { id, ingredient, ingredientsId } = action.payload;
                return {
                    ...state,
                    dishes: [
                        ...state.dishes.filter(dish => {
                            if(dish.id === id){
                                const index = dish.ingredients.findIndex(loopedIngredient => ingredient.id === loopedIngredient.id);
                                if(index >= 0){
                                    dish.ingredients.splice(index,1)
                                }else{
                                    dish.ingredients.push(ingredient)
                                }
                                if(ingredientsId){
                                    dish.ingredientsId = [...ingredientsId];
                                }
                            }
                            return dish;
                        })
                    ]
                }
            }
            case ActionType.REFRESH_INGREDIENTS_IN_DISH_SUCCESS_ACTION: {
                const { dishId, ingredientsId } = action.payload;
                return {
                    ...state,
                    dishes: state.dishes.filter(dish => {
                        if(dish.id === dishId){
                            const ingredients = dish.ingredients.filter(ingredient => ingredientsId.includes(ingredient.id))
                            dish.ingredientsId = [...ingredientsId];
                            dish.ingredients = [...ingredients];
                        }
                        return dish;
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
export default dishesReducer;

