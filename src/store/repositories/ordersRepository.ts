import { db } from "../../config/firebaseConfig"
import { store } from "../index";
import Order from "../../api/models/Order";

const getOrders = async (): Promise<Order[]> => {
    const { user: {user} } = store.getState();
    const q = db.collection("orders").where('userId', "==", user.id)
    return await q.get().then(snapshot => 
        snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                table: data.table,
                status: data.status,
                dishes: [],
                userId: data.userId
            }
        }
    ));
} 


export {
    getOrders
}