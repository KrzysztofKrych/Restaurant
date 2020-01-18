import { db } from "../../config/firebaseConfig"
import Dish from "../../api/models/Dish"
import { store } from "../index";

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


export {
    getDishes
}