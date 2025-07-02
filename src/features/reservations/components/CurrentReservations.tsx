import { useEffect, useState } from "react";
import { useAuth } from "@context/AuthContext";
import { getReservationById } from "../services/reservations.service";
import type { Reservation } from "../types";
import { Spinner } from "@heroui/spinner";
import CurrentReservationCard from "./CurrentReservationCard";

export default function CurrentReservations() {
  const { customUser } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!customUser?.currentReservations) return;

      setLoading(true);
      const fetched = await Promise.all(
        customUser.currentReservations.map(getReservationById)
      );
      setReservations(fetched.filter((r): r is Reservation => r !== null));
      setLoading(false);
    };

    fetchReservations();
  }, [customUser?.currentReservations]);

  if (loading) {
    return <Spinner label="Cargando reservas..." />;
  }

  return (
    <div className="flex flex-col gap-4 bg-background p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Reservas activas</h2>
      {reservations.length === 0 ? (
        <p className="text-gray-600">No tienes reservas activas.</p>
      ) : (
        reservations.map((res) => (
          <CurrentReservationCard key={res.washerId} reservation={res} />
        ))
      )}
    </div>
  );
}