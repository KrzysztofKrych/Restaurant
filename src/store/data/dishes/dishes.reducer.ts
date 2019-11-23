import Redux from "redux";

import ActionType, {
    AddDishInitAction,
    RemoveDishInitAction,
    AddIngredientToDishAction
} from "./dishes.actions"
import Dish from "../../../api/models/Dish";

export interface DishesState {
    dishes: Dish[]
}

export const initialDishesState: DishesState = {
    dishes: [{
        name: 'qweqwe',
        id: Date.now(),
        ingredients: []
    },
    {
        name: 'qweqwe2',
        id: Date.now() + 1,
        ingredients: []
    }]
}

export type DishesAction = AddDishInitAction | RemoveDishInitAction | AddIngredientToDishAction;

const dishesReducer: Redux.Reducer<DishesState, DishesAction> = (state = initialDishesState, action: DishesAction) => {
    if(ActionType){
        switch(action.type){
            case ActionType.ADD_DISH_SUCCESS_ACTION : {
                return {
                    ...state,
                    dishes: [...state.dishes, action.payload.dish]
                }
            }
            case ActionType.REMOVE_DISH_SUCCESS_ACTION : {
                const { id } = action.payload.dish;

                return {
                    ...state,
                    dishes: [...state.dishes.filter(dish => dish.id !== id)]
                }
            }
            case ActionType.ADD_INGREDIENT_TO_DISH_SUCCESS_ACTION: {
                const { id, ingredient } = action.payload;
                console.log(id, ingredient)
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
                            }
                            return dish;
                        })
                    ]
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

