import Redux from "redux"
import Ingredient from "../../../api/models/Ingredient";

enum ActionType {
    ADD_INGREDIENT_SUCCESS_ACTION = "ADD_INGREDIENT_SUCCESS_ACTION"
}

export class AddIngredientSuccessAction implements Redux.Action {
    public type = ActionType.ADD_INGREDIENT_SUCCESS_ACTION;
    public payload: { ingredient: Ingredient }

    constructor(ingredient: Ingredient){
        this.payload = { ingredient }
    }
}


export default ActionType;