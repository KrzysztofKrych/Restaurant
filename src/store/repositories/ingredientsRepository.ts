import { db } from "../../config/firebaseConfig"
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
                avatar: data.avatar,
                userId: getUserId(),
            }
        }
    ));
}

const addIngredient = async (ingredient: Ingredient) => {
    ingredient.userId = getUserId();
    return await db.collection("ingredients").add(ingredient).then((docRef) => {
        return docRef.id
    }).catch((error) => {
        console.log(error)
        return ""
    })
}

const removeIngredient = async (id: string) => {
    return await db.collection("ingredients").doc(id).delete().then(() => true
    ).catch((error) => {
        console.log(error);
        return false
    })
}

const updateAvatar = async (id: string, avatar: string) => {
    return await db.collection("ingredients").doc(id).update({
        avatar
    }).then(() => true)
    .catch((error) => {
        console.log(error);
        return false
    })
}


export {
    getIngredients,
    addIngredient,
    removeIngredient,
    updateAvatar
}