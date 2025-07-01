import { db } from "@config/firebase.config";
import { setDoc, doc, Timestamp, getDoc, query, updateDoc, collection, where, getDocs, QueryDocumentSnapshot, orderBy, limit, startAfter } from "firebase/firestore";
import type { Reservation, Wash } from "../types";
import type { PaginatedReservations } from "../types";
import { maxWashDuration } from "~/src/utils/constants";

export async function reserve(studentCode: string, washerId: string, userEmail: string): Promise<void> {
  const createdAt = Timestamp.now();
  const state = "waiting"; 

  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "-");

  const reservationId = `reservation_${studentCode}_${washerId}_${dateStr}_${timeStr}`;

  const reservation: Reservation = {
    washerId,
    studentCode,
    userEmail,
    createdAt,
    state
  };

  const reservationRef = doc(db, "reservations", reservationId);
  const userRef = doc(db, "users", studentCode);

  try {
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("Usuario no encontrado.");
    }

    const userData = userSnap.data();
    const currentReservations: string[] = userData.currentReservations || [];

    if (currentReservations.length >= 2) {
      throw new Error("No puedes tener más de dos reservas activas.");
    }
    
    await setDoc(reservationRef, reservation);
    await updateDoc(userRef, {
      currentReservations: [...currentReservations, reservationId]
    });

    await disableWasher(washerId);

  } catch (error) {
    console.error("Error creando la reserva:", error);
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

export async function startWashing(studentCode: string, washerId: string, notes: string): Promise<void> {
    const startTime = Timestamp.now();
    const maxDuration = new Timestamp(startTime.seconds + maxWashDuration / 1000, startTime.nanoseconds + (maxWashDuration % 1000) * 1e6);

    const wash: Wash = {
        washerId: washerId,
        studentCode: studentCode,
        startTime: startTime,
        endTime: null,
        maxDuration: maxDuration,
        notes: notes
    };

    const washRef = doc(db, "washes", `wash_${studentCode}_${washerId}_${startTime.toDate().toISOString()}`);

    try {
        await setDoc(washRef, wash);
        console.log("Lavado iniciado exitosamente:", wash);
    } catch (error) {
        console.error("Error starting wash:", error);
        throw new Error("No se pudo iniciar el lavado.");
    }
}

export async function getPaginatedReservationsByUser(
    studentCode: string,
    pageSize: number = 10,
    lastDoc?: QueryDocumentSnapshot,
    direction: "asc" | "desc" = "desc"
  ): Promise<PaginatedReservations> {
    let q = query(
      collection(db, "reservations"),
      where("studentCode", "==", studentCode),
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

export async function getReservationsByDate(date: Timestamp, studentCode: string): Promise<Reservation[]> {
    try {
      const localDate = date.toDate();
      console.log(localDate)
  
      // UTC día local: 00:00:00 y 23:59:59 en tu zona horaria (ej. -05:00)
      const startOfDay = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), 0, 0, 0);
      const endOfDay = new Date(localDate.getFullYear(), localDate.getMonth(), localDate.getDate(), 23, 59, 59, 999);
  
      const startTimestamp = Timestamp.fromDate(startOfDay);
      const endTimestamp = Timestamp.fromDate(endOfDay);
  
      const q = query(
        collection(db, "reservations"),
        where("studentCode", "==", studentCode),
        where("createdAt", ">=", startTimestamp),
        where("createdAt", "<=", endTimestamp)
      );
  
      const snapshot = await getDocs(q);
  
      if (snapshot.empty) {
        console.log("No reservations found for the given date.");
        return [];
      }
  
      return snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }) as Reservation);
    } catch (error) {
      console.error("Error fetching reservations by date:", error);
      throw new Error("No se pudieron obtener las reservas por fecha.");
    }
}
  
  