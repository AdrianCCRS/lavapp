import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@config/firebase.config";
import type { Reservation } from "../types";
import { getReservationById } from "../services/reservations.service";

export function useActiveReservations(studentCode: string) {
  const [activeReservations, setActiveReservations] = useState<Reservation[]>([]);
  const [loadingActive, setLoadingActive] = useState(true);

  useEffect(() => {
    if (!studentCode) return;

    setLoadingActive(true);

    // Escucha realtime el documento del usuario
    const userDocRef = doc(db, "users", studentCode);
    const unsubscribe = onSnapshot(userDocRef, async (docSnap) => {
      if (!docSnap.exists()) {
        setActiveReservations([]);
        setLoadingActive(false);
        return;
      }

      const data = docSnap.data();
      const currentReservations: string[] = data.currentReservations || [];

      if (currentReservations.length === 0) {
        setActiveReservations([]);
        setLoadingActive(false);
        return;
      }

      const fetched = await Promise.all(
        currentReservations.map(getReservationById)
      );
      setActiveReservations(fetched.filter((r): r is Reservation => r !== null));
      setLoadingActive(false);
    });

    return () => unsubscribe();
  }, [studentCode, db]);

  return { activeReservations, loadingActive };
}
