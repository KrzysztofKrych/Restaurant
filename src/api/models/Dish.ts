import Ingredient from "./Ingredient";

export default interface Dish {
    name: string
    id: string
    ingredients: Ingredient[]
}