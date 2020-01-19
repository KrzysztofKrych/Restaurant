import { db } from "../../config/firebaseConfig"
import Dish from "../../api/models/Dish"
import { store } from "../index";
import Ingredient from "../../api/models/Ingredient";
import { addIngredientToDishActionSuccess } from "../data/dishes/dishes.middleware";

const getDishes = async (): Promise<Dish[]> => {
    const { user: {user} } = store.getState();
    return await db.collection("dishes").get().then(snapshot => 
        snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                userId: user.id,
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