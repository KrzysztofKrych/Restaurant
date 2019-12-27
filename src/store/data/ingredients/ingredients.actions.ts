import Redux from "redux"
import Ingredient from "../../../api/models/Ingredient";

enum ActionType {
    ADD_INGREDIENT_SUCCESS_ACTION = "ADD_INGREDIENT_SUCCESS_ACTION",
    ADD_AVATAR_TO_INGREDIENT_SUCCESS_ACTION = "ADD_AVATAR_TO_INGREDIENT_SUCCESS_ACTION",
    EDIT_INGREDIENT_NAME_SUCCESS_ACTION = "EDIT_INGREDIENT_NAME_SUCCESS_ACTION",
    DELETE_INGREDIENT_NAME_SUCCESS_ACTION = "DELETE_INGREDIENT_NAME_SUCCESS_ACTION"
}

export class AddIngredientSuccessAction implements Redux.Action {
    public readonly type = ActionType.ADD_INGREDIENT_SUCCESS_ACTION;
    public readonly payload: { ingredient: Ingredient }

    constructor(ingredient: Ingredient){
        this.payload = { ingredient }
    }
}

export class deleteIngredientNameActionSuccess implements Redux.Action {
    public readonly type = ActionType.DELETE_INGREDIENT_NAME_SUCCESS_ACTION;
    public readonly payload: { id: number }

    constructor(id:number){
        this.payload = { id }
    }
}

export class editIngredientNameActionSuccess implements Redux.Action {
    public readonly type = ActionType.EDIT_INGREDIENT_NAME_SUCCESS_ACTION;
    public readonly payload: { newName: string, id: number }

    constructor(newName: string, id:number){
        this.payload = { newName, id }
    }
}

export class addAvatarToIngredientActionSuccess implements Redux.Action {
    public readonly type = ActionType.ADD_AVATAR_TO_INGREDIENT_SUCCESS_ACTION;
    public readonly payload: { avatar: string, id: number }

    constructor(avatar: string, id:number){
        this.payload = { avatar,id }
    }
}


export default ActionType;