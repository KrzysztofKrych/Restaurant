export default interface Ingredient {
    id: string
    name: string
    dishesId: string[]
    avatar?: string
    userId?: string
}