import { db } from "@/config/firebase.config";
import { setDoc, doc, Timestamp, getDoc, updateDoc } from "firebase/firestore";
import type { Wash } from "../types";

export async function startWashing(studentCode: string, washerId:string, duration:number, reservationId:string, news:string) {
    const startTime = Timestamp.now();
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "-");

    const washId = `wash_${studentCode}_${washerId}_${dateStr}_${timeStr}`;
    const wash: Wash = {
        washerId,
        studentCode,
        startTime,
        reservationId,
        duration,
        news
    };
    const washRef = doc(db, "washes", washId);
    const userRef = doc(db, "users", studentCode);

    try{
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            throw new Error("Usuario no encontrado.");
        }

        const userData = userSnap.data();
        const currentWashes: string[] = userData.currentWashes || [];

        if (currentWashes.length >= 2) {
            throw new Error("No puedes tener más de dos lavados activos.");
        }

        await setDoc(washRef, wash);
        completeReservation(reservationId);
        await updateDoc(userRef, {
            currentWashes: [...currentWashes, washId],
            currentReservations: userData.currentReservations.filter((resId: string) => resId !== reservationId)
        });
    } catch (error) {
        console.error("Error iniciando el lavado:", error);
        throw new Error("No se pudo iniciar el lavado.");
    }
    return washId;
}

export function completeReservation(reservationId: string): void {
    const reservationRef = doc(db, "reservations", reservationId);
    updateDoc(reservationRef, {
        state: "completed"
    }).catch((error) => {
        console.error("Error completando la reserva:", error);
        throw new Error("No se pudo completar la reserva.");
    });
}   

export async function getCurrentWashes(studentCode: string): Promise<Wash[]> {
    const userRef = doc(db, "users", studentCode);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        throw new Error("Usuario no encontrado.");
    }

    const userData = userSnap.data();
    const currentWashes: string[] = userData.currentWashes || [];
    const washes: Wash[] = [];

    for (const washId of currentWashes) {
        const washSnap = await getDoc(doc(db, "washes", washId));
        if (washSnap.exists()) {
            washes.push(washSnap.data() as Wash);
        }
    }

    return washes;
}

export async function endWash(washId: string): Promise<void> {
    const washRef = doc(db, "washes", washId);
    const washSnap = await getDoc(washRef);

    if (!washSnap.exists()) {
        throw new Error("Lavado no encontrado.");
    }

    const washData = washSnap.data() as Wash;
    const userRef = doc(db, "users", washData.studentCode);
    
    try {
        await updateDoc(washRef, {
            endTime: Timestamp.now()
        });

        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            const userData = userSnap.data();
            const currentWashes: string[] = userData.currentWashes || [];
            await updateDoc(userRef, {
                currentWashes: currentWashes.filter(id => id !== washId)
            });
        }
    } catch (error) {
        console.error("Error finalizando el lavado:", error);
        throw new Error("No se pudo finalizar el lavado.");
    }
}