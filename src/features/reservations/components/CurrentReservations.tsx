import { useAuth } from "@context/AuthContext";
import { Spinner } from "@heroui/spinner";
import CurrentReservationCard from "./CurrentReservationCard";
import { useActiveReservations } from "../hooks/useActiveReservations";

export default function CurrentReservations() {
  const { customUser } = useAuth();
  const { activeReservations, loadingActive } = useActiveReservations(customUser?.id || "");

  if (loadingActive) {
    return <Spinner label="Cargando reservas..." />;
  }

  return (
    <div className="flex flex-col gap-4 bg-background p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold">Reservas activas</h2>
      {activeReservations.length === 0 ? (
        <p className="text-gray-600">No tienes reservas activas.</p>
      ) : (
        activeReservations.map((res) => (
          <CurrentReservationCard key={res.washerId} reservation={res} />
        ))
      )}
    </div>
  );
}