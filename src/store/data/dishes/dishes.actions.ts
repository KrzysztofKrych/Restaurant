import Redux from "redux"
import Dish from "../../../api/models/Dish";
import Ingredient from "../../../api/models/Ingredient";

enum ActionType {
    ADD_DISH_SUCCESS_ACTION = "ADD_DISH_SUCCESS_ACTION",
    SET_DISHES_SUCCESS_ACTION = "SET_DISHES_SUCCESS_ACTION",
    REMOVE_DISH_SUCCESS_ACTION = "REMOVE_DISH_SUCCESS_ACTION",
    ADD_INGREDIENT_TO_DISH_SUCCESS_ACTION = "ADD_INGREDIENT_TO_DISH_SUCCESS_ACTION"
}



export class SetDishesSuccessAction implements Redux.Action {
    public readonly type = ActionType.SET_DISHES_SUCCESS_ACTION;
    public readonly payload: { dishes: Dish[] }

    constructor(dishes: Dish[]){
        this.payload = { dishes }
    }
}
export class AddDishInitAction implements Redux.Action {
    public readonly type = ActionType.ADD_DISH_SUCCESS_ACTION;
    public readonly payload: { dish: Dish }

    constructor(dish: Dish){
        this.payload = { dish }
    }
}

export class RemoveDishInitAction implements Redux.Action {
    public readonly type = ActionType.REMOVE_DISH_SUCCESS_ACTION;
    public readonly payload: { id: string }

    constructor(id: string){
        this.payload = { id }
    }
}

export class AddIngredientToDishAction implements Redux.Action {
    public readonly type = ActionType.ADD_INGREDIENT_TO_DISH_SUCCESS_ACTION;
    public readonly payload: { id: string, ingredient: Ingredient, ingredientsId?: string[] }

    constructor(id: string, ingredient: Ingredient, ingredientsId?: string[]){
        this.payload = { id, ingredient, ingredientsId }
    }
}


export default ActionType;