import { collection, getDocs, onSnapshot, snapshotEqual } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { useEffect, useState } from "react";

export default LoadAllDoc = (name_collection) =>{
        const [data, setData] = useState();
        useEffect( async () =>{
            const docRef = await collection(FIRESTORE_DB, name_collection);

            const subscriber = await onSnapshot(docRef, {
                next: (snapshot) => {
                    const dataAux = [];
                    snapshot.docs.forEach((doc) => {
                        dataAux.push({
                            id: doc.id,
                            ...doc.data()
                        });
                    })
                    setData(dataAux)
                }
            })
        
            return () => {
                subscriber();
            }
        },[])
    return data
}