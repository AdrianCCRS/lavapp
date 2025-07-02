import { useCountdown } from "../hooks/useCountdown";
import type { Reservation } from "../types";
import { Button } from "@heroui/button";

export default function ReservationCard({ reservation }: { reservation: Reservation }) {
  const expiresAt = reservation.expiresAt.toDate(); 
  const { minutes, seconds, isExpired } = useCountdown(expiresAt);

  return (
    <div className="flex flex-col border rounded-lg p-4 bg-white shadow">
      <span className="text-sm text-gray-500">
        Lavadora: <strong>{reservation.washerId}</strong>
      </span>

      {isExpired ? (
        <span className="text-red-600 font-semibold">
          Tiempo expirado. La reserva será cancelada automáticamente.
        </span>
      ) : (
        <span className="text-green-600 font-medium">
          Tiempo restante: {minutes}m {seconds}s
        </span>
      )}

      {!isExpired && (
        <Button color="primary" className="mt-2">
          Iniciar lavado
        </Button>
      )}
    </div>
  );
}