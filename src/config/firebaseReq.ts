
import { db } from './firebaseConfig';

const get = async (collection: string) => 
    await db.collection(collection).get().then(fireDocument => 
        fireDocument.docs.map(doc => {
            return {
                ...doc.data(),
                id: doc.id
            }
        }
    ));

const getByQuery = async (collection: string, query: string, value: string) => {
    const q = db.collection(collection).where(query, "==", value);
    const queries = await q.get().then((fireDocument) => 
        fireDocument.docs.map(doc => {
            return {
                ...doc.data(),
                id: doc.id
            }
        }
    ));
    return queries
}
export {
    get,
    getByQuery
}