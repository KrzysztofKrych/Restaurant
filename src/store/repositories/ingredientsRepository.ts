import { db } from "../../config/firebaseConfig"
import Dish from "../../api/models/Dish"
import { store } from "../index";
import Ingredient from "../../api/models/Ingredient";

const getIngredients = async (): Promise<Ingredient[]> => {
    const { user: {user} } = store.getState();
    return await db.collection("ingredients").get().then(snapshot => 
        snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                dishId: user.id
            }
        }
    ));
} 


export {
    getIngredients
}