import Redux from "redux"
import Dish from "../../../api/models/Dish";
import Ingredient from "../../../api/models/Ingredient";

enum ActionType {
    ADD_DISH_SUCCESS_ACTION = "ADD_DISH_SUCCESS_ACTION",
    REMOVE_DISH_SUCCESS_ACTION = "REMOVE_DISH_SUCCESS_ACTION",
    ADD_INGREDIENT_TO_DISH_SUCCESS_ACTION = "ADD_INGREDIENT_TO_DISH_SUCCESS_ACTION"
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
    public readonly payload: { dish: Dish }

    constructor(dish: Dish){
        this.payload = { dish }
    }
}

export class AddIngredientToDishAction implements Redux.Action {
    public readonly type = ActionType.ADD_INGREDIENT_TO_DISH_SUCCESS_ACTION;
    public readonly payload: { id: number, ingredient: Ingredient }

    constructor(id: number, ingredient: Ingredient){
        this.payload = { id, ingredient }
    }
}


export default ActionType;