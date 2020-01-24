import { db } from "../../config/firebaseConfig"
import { store } from "../index";
import Ingredient from "../../api/models/Ingredient";
import { getUserId } from "../../helpers/helpers";

const getIngredients = async (): Promise<Ingredient[]> => {
    const q = db.collection("ingredients").where('userId', "==", getUserId())
    return await q.get().then(snapshot => 
        snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                dishesId: data.dishesId,
                userId: getUserId(),
            }
        }
    ));
}

const addIngredient = async (ingredient: Ingredient) => {
    ingredient.userId = getUserId();
    return await db.collection("ingredients").add(ingredient).then(() => {
        return true
    }).catch((error) => {
        console.log(error);
        return false
    })
}
const removeIngredient = async (id: string) => {
    return await db.collection("ingredients").doc(id).delete().then(() => {
        return true
    }).catch((error) => {
        console.log(error);
        return false
    })
}


export {
    getIngredients,
    addIngredient,
    removeIngredient
}