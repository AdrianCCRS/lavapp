import { db } from "@config/firebase.config";
import { setDoc, doc, Timestamp, getDoc, query, updateDoc, collection, where, getDocs, QueryDocumentSnapshot, orderBy, limit, startAfter } from "firebase/firestore";
import type { Reservation } from "../types";
import type { PaginatedReservations } from "../types";
import { handleFirestore, handleFirestoreErrorOnly } from "~/src/utils/informationHandler";

export async function reserve(studentCode: string, washerId: string, userEmail: string): Promise<void> {
  const createdAt = Timestamp.now();

  const nextMinute = new Date(createdAt.toDate());
  nextMinute.setSeconds(0, 0); 
  nextMinute.setMinutes(nextMinute.getMinutes() + 1); 

  const expirationTime = new Date(nextMinute);
  expirationTime.setMinutes(expirationTime.getMinutes() + 4);
  
  const expiresAt = Timestamp.fromDate(expirationTime);
  const state = "waiting";
  const now = new Date();
  const dateStr = now.toISOString().split("T")[0];
  const timeStr = now.toTimeString().split(" ")[0].replace(/:/g, "-");

  const reservationId = `reservation_${studentCode}_${washerId}_${dateStr}_${timeStr}`;

  const reservation: Reservation = {
    id: reservationId,
    washerId,
    studentCode,
    userEmail,
    createdAt,
    expiresAt,
    state
  };

  await handleFirestore(
    async () => {
    const reservationRef = doc(db, "reservations", reservationId);
    const userRef = doc(db, "users", studentCode);
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

    } , {
      successTitle: "Reserva exitosa",
      successMessage: "Tu reserva ha sido creada exitosamente.",
      errorTitle: "Error al crear la reserva",
      errorMessage: "No se pudo crear la reserva. Verifica los datos e intenta nuevamente.",
      });
}

async function disableWasher(washerId: string): Promise<void> {
  handleFirestoreErrorOnly(
    async () => {
      const washerRef = doc(db, "washers", washerId);
      const washer = await getDoc(washerRef);

    if (!washer.exists()) {
        throw new Error("La lavadora no existe, washerId: " + washerId);
    }

    try{
        await setDoc(washerRef, { available: false }, { merge: true });
    } catch(error){
        if (error instanceof Error) {
            throw new Error("Error al deshabilitar la lavadora: " + error.message);
        }
        throw new Error("Error inesperado al deshabilitar la lavadora.");      
    }
  }, {
    errorTitle: "Error al deshabilitar la lavadora",
    errorMessage: "No se pudo deshabilitar la lavadora. Intenta nuevamente.",
  });

}

async function enableWasher(washerId: string): Promise<void> {
  await handleFirestoreErrorOnly(
    async () => {
      const washerRef = doc(db, "washers", washerId);
      await updateDoc(washerRef, { available: true });
    }, {
      errorTitle: "Error al habilitar la lavadora",
      errorMessage: "No se pudo habilitar la lavadora. Intenta nuevamente.",
    });
}

export async function getPaginatedReservationsByUser(
    studentCode: string,
    pageSize: number = 10,
    lastDoc?: QueryDocumentSnapshot,
    direction: "asc" | "desc" = "desc"
  ): Promise<PaginatedReservations> {
    const result = await handleFirestoreErrorOnly(
      async () => {
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
      }, {
        errorTitle: "Error al obtener reservas paginadas",
        errorMessage: "No se pudieron obtener las reservas. Intenta nuevamente.",
      }
    );

    // If handleFirestoreErrorOnly returns null, return empty result with proper typing
    if (!result) {
      return {
        reservations: [],
        lastVisible: undefined as any // Type assertion needed due to type definition
      };
    }

    return result;
}

export async function getReservationsByDate(date: Timestamp, studentCode: string): Promise<Reservation[]> {
    const reservations = await handleFirestoreErrorOnly(
    async () => {
      const localDate = date.toDate();
  
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
        throw new Error("No se encontraron reservas para la fecha dada.");
        return [];
      }
  
      return snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }) as Reservation);
    }, {
    errorTitle: "Error al obtener reservas por fecha",
    errorMessage: "No se pudieron obtener las reservas por fecha. Intenta nuevamente.",
    });

    return reservations ?? [];
}

export async function getReservationById(reservationId: string): Promise<Reservation | null> {
  return handleFirestoreErrorOnly(async () => {
    const reservationRef = doc(db, "reservations", reservationId);
    const snapshot = await getDoc(reservationRef);

    if (!snapshot.exists()) {
      throw new Error("Reserva no encontrada.");
    }

    const data = snapshot.data();
    if (!data) {
      throw new Error("No se pudo obtener los datos de la reserva.");
    }

    const reservation: Reservation = {
      id: snapshot.id,
      washerId: data.washerId,
      studentCode: data.studentCode,
      userEmail: data.userEmail,
      createdAt: data.createdAt,
      expiresAt: data.expiresAt,
      state: data.state,
    };

    return reservation;
  }, {
    errorTitle: "Error al obtener la reserva",
    errorMessage: "No se pudo obtener la reserva. Intenta nuevamente.",
  });
}

export async function cancelReservation(reservationId: string): Promise<void> {
  await handleFirestore(async () => {
    const reservationRef = doc(db, "reservations", reservationId);
    const reservationSnap = await getDoc(reservationRef);

    if (!reservationSnap.exists()) {
      throw new Error("Reserva no encontrada.");
    }

    const reservationData = reservationSnap.data() as Reservation;
    const userRef = doc(db, "users", reservationData.studentCode);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("Usuario no encontrado.");
    }

    const userData = userSnap.data();
    const currentReservations: string[] = userData.currentReservations || [];
    
    await updateDoc(reservationRef, { state: "cancelled" });
    
    await updateDoc(userRef, {
      currentReservations: currentReservations.filter(id => id !== reservationId)
    });

    await enableWasher(reservationData.washerId);
  }, {
    successTitle: "Reserva cancelada",
    successMessage: "La reserva ha sido cancelada exitosamente.",
    errorTitle: "Error al cancelar la reserva",
    errorMessage: "No se pudo cancelar la reserva. Intenta nuevamente.",
  });
}
  