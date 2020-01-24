
import { db } from './firebaseConfig';

const get = async (collection: string) => 
    await db.collection(collection).get().then(snapshot => 
        snapshot.docs.map(doc => {
            return {
                ...doc.data(),
                id: doc.id
            }
        }
    ));

const getByQuery = async (collection: string, query: string, value: string) => {
    const q = db.collection(collection).where(query, "==", value);
    const queries: any = await q.get().then((snapshot) => 
        snapshot.docs.map(doc => {
            return {
                ...doc.data(),
                id: doc.id
            }
        }
    ));
    return {
        email: (queries[0] && queries[0].email) || "",
        id: (queries[0] && queries[0].id) || ""
    }
}
export {
    get,
    getByQuery
}