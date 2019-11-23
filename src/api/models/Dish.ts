import Ingredient from "./Ingredient";

export default interface Dish {
    name: string
    id: number
    ingredients: Ingredient[]
}