import { db } from "@config/firebase.config";
import { setDoc, doc, Timestamp, getDoc, query, collection, where, getDocs, QueryDocumentSnapshot, orderBy, limit, startAfter } from "firebase/firestore";
import type { Reservation, Wash } from "../types";
import type { PaginatedReservations } from "../types";
import { maxWashDuration } from "~/src/utils/constants";

export async function reserve(userId: string, washerId: string, userEmail: string): Promise<void> {
    const createdAt = Timestamp.now();

    // Format the current date and time as YYYY-MM-DD_HH-MM-SS
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "-");

    // Create a unique document ID for the reservation
    const reservationId = `reservation_${userId}_${washerId}_${dateStr}_${timeStr}`;

    const reservation: Reservation = {
        washerId,
        userId,
        userEmail,
        createdAt
    };

    const reservationRef = doc(db, "reservations", reservationId);

    try {
        await setDoc(reservationRef, reservation);
        disableWasher(washerId);
    } catch (error) {
        console.error("Error creating reservation:", error);
        throw new Error("No se pudo realizar la reserva.");
    }
}

async function disableWasher(washerId: string): Promise<void> {
    const washerRef = doc(db, "washers", washerId);
    const washer = await getDoc(washerRef);

    if (!washer.exists()) {
        throw new Error("Washer not found.");
    }

    try{
        await setDoc(washerRef, { available: false }, { merge: true });
    } catch(error){
        console.error("Error disabling washer: ", error)
    }

}

export async function startWashing(userId: string, washerId: string, notes: string): Promise<void> {
    const startTime = Timestamp.now();
    const maxDuration = new Timestamp(startTime.seconds + maxWashDuration / 1000, startTime.nanoseconds + (maxWashDuration % 1000) * 1e6);

    const wash: Wash = {
        washerId: washerId,
        userId: userId,
        startTime: startTime,
        endTime: null,
        maxDuration: maxDuration,
        notes: notes
    };

    const washRef = doc(db, "washes", `wash_${userId}_${washerId}_${startTime.toDate().toISOString()}`);

    try {
        await setDoc(washRef, wash);
        console.log("Lavado iniciado exitosamente:", wash);
    } catch (error) {
        console.error("Error starting wash:", error);
        throw new Error("No se pudo iniciar el lavado.");
    }
}

export async function getPaginatedReservationsByUser(
    userId: string,
    pageSize: number = 10,
    lastDoc?: QueryDocumentSnapshot,
    direction: "asc" | "desc" = "desc"
  ): Promise<PaginatedReservations> {
    let q = query(
      collection(db, "reservations"),
      where("userId", "==", userId),
      orderBy("createdAt", direction),
      limit(pageSize)
    );
  
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
  
    const snapshot = await getDocs(q);
  
    return {
      reservations: snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }) as Reservation),
      lastVisible: snapshot.docs[snapshot.docs.length - 1],
    };
  }
  