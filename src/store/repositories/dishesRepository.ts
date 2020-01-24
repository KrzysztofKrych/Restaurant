import { db } from "../../config/firebaseConfig"
import Dish from "../../api/models/Dish"
import Ingredient from "../../api/models/Ingredient";
import { addIngredientToDishActionSuccess } from "../data/dishes/dishes.middleware";
import { getUserId } from "../../helpers/helpers";

const getDishes = async (): Promise<Dish[]> => {
    const q = db.collection("dishes").where('userId', "==", getUserId())
    return await q.get().then(snapshot => 
        snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                userId: getUserId(),
                ingredients: []
            }
        }
    ));
} 

const setIngredientsToDishes = (ingredients: Ingredient[], dishes: Dish[]) => {
    dishes.forEach(dish => {
        const ingredientInDish = ingredients.find(ingredient => ingredient.dishesId.includes(dish.id));
        if(ingredientInDish) addIngredientToDishActionSuccess(dish.id, ingredientInDish)
    })
}


export {
    getDishes,
    setIngredientsToDishes
}