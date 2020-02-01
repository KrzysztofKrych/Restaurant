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
                ingredients: [],
                ingredientsId: data.ingredientsId
            }
        }
    ));
} 

const setIngredientsToDishes = (ingredients: Ingredient[], dishes: Dish[]) => {
    dishes.forEach(dish => {
        const ingredientsInDish = ingredients.filter(ingredient => 
                                dish.ingredientsId && dish.ingredientsId.includes(ingredient.id));
        if(ingredientsInDish){
            ingredientsInDish.forEach(ingredient => {
                addIngredientToDishActionSuccess(dish.id, ingredient)
            })
        }
    })
}

const addDish = async (dish: Dish) => {
    const { name } = dish
    const body = {
        name,
        userId: getUserId(),
        ingredientsId: []
    }
    return await db.collection("dishes").add(body).then((docRef) => {
        return docRef.id
    }).catch((error) => {
        console.log(error);
        return ""
    })
}

const removeDish = async (id: string) => {
    return await db.collection("dishes").doc(id).delete().then(() => true)
    .catch((error) => {
        console.log(error);
        return false
    })
}

const addIngredientToDish = async (dish:Dish, id: string) => {
    let { ingredientsId } = dish;
    ingredientsId = ingredientsId.includes(id) ? 
    ingredientsId = ingredientsId.filter(ingredientId => ingredientId !== id) :
    ingredientsId = ingredientsId.concat(id);

    return await db.collection("dishes").doc(dish.id).update({
        ingredientsId
    }).then(() => ingredientsId)
    .catch((error) => {
        console.log(error);
        return []
    })
}
const removeIngredientFromDish = async (dish:Dish, id: string) => {
    let { ingredientsId } = dish;
    ingredientsId = ingredientsId.filter(ingredientId => ingredientId !== id);

    return await db.collection("dishes").doc(dish.id).update({
        ingredientsId
    }).then(() => ingredientsId)
    .catch((error) => {
        console.log(error);
        return []
    })
}

export {
    getDishes,
    setIngredientsToDishes,
    addDish,
    removeDish,
    addIngredientToDish,
    removeIngredientFromDish
}