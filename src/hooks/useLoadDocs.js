import { collection, getDocs, onSnapshot, orderBy, query, snapshotEqual, where } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { useEffect, useState } from "react";

export default useLoadDocs = (collections) => {
    const [data, setData] = useState();
        useEffect( () =>{
            const loadData = async () =>{
                const docRef = await collection(FIRESTORE_DB, collections);
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
            }

            loadData();            
        },[])
    return data
}