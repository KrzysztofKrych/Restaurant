import Dish from "./Dish";
import OrderStatus from "./OrderStatus";

export default interface Order {
    id: number
    dishes: Dish[]
    table: number
    status: OrderStatus
}