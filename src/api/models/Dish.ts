import Ingredient from "./Ingredient";

export default interface Dish {
    name: string
    id: string
    userId: string;
    ingredients: Ingredient[]
    ingredientsId: string[]
}