import { useEffect, useState } from "react";
import {collection, onSnapshot} from "firebase/firestore";
import { db } from "@config/firebase.config";
import type { Washer } from "../types";

export function useLiveWashers() {
    const [washers, setWashers] = useState<Washer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "washers"), (snapshot) => {
            const washersData: Washer[] = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Washer[];
            setWashers(washersData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return {washers, loading};
}
