import { db } from "@/config/firebase.config";
import { setDoc, doc, Timestamp, getDoc, updateDoc } from "firebase/firestore";
import type { Wash } from "../types";
import {handleFirestore } from "@/utils/informationHandler";

export async function startWashing(
  studentCode: string,
  washerId: string,
  duration: number,
  reservationId: string,
  news: string
): Promise<string> {
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
    news,
  };

  const washRef = doc(db, "washes", washId);
  const userRef = doc(db, "users", studentCode);

  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    throw new Error("Usuario no encontrado.");
  }

  const userData = userSnap.data();
  const currentWashes: string[] = userData.currentWashes || [];

  if (currentWashes.length >= 2) {
    throw new Error("No puedes tener más de dos lavados activos. Finaliza uno antes de iniciar otro.");
  }

  await setDoc(washRef, wash);
  completeReservation(reservationId);
  await updateDoc(userRef, {
    currentWashes: [...currentWashes, washId],
    currentReservations: userData.currentReservations.filter(
      (resId: string) => resId !== reservationId
    ),
  });

  return washId;
}

export async function completeReservation(reservationId: string): Promise<void> {
    await handleFirestore(async () => {
        const reservationRef = doc(db, "reservations", reservationId);
        await updateDoc(reservationRef, {
            state: "completed"
        });
    }, {
        successTitle: "Reserva completada",
        successMessage: "La reserva se completó correctamente.",
        errorTitle: "Error al completar reserva",
        errorMessage: "No se pudo completar la reserva."
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
    await handleFirestore(async () => {
        const washRef = doc(db, "washes", washId);
        const washSnap = await getDoc(washRef);

        if (!washSnap.exists()) {
            throw new Error("La referencia al registro del lavado no fue encontrada.");
        }

        const washData = washSnap.data() as Wash;
        const userRef = doc(db, "users", washData.studentCode);
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
    }, {
        successTitle: "Lavado finalizado",
        successMessage: "El lavado se finalizó correctamente.",
        errorTitle: "Error al finalizar lavado",
        errorMessage: "No se pudo finalizar el lavado."
    });
}