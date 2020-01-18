import { db } from "../../config/firebaseConfig"
import Dish from "../../api/models/Dish"

const getDishes = async (): Promise<Dish[]> => 
    await db.collection("dishes").get().then(snapshot => 
        snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name,
                ingredients: []
            }
    }
));


export {
    getDishes
}