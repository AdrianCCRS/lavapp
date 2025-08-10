import { useCountdown } from "@/hooks/useCountdown";
import type { Reservation } from "../types";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";
import { cancelReservation } from "../services/reservations.service";

export default function CurrentReservationCard({ reservation }: { reservation: Reservation }) {
  const expiresAt = reservation.expiresAt.toDate(); 
  const navigate = useNavigate();
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
        <>
          <Button color="primary" className="mt-2" onPress={() => {navigate(`/start/washer/${reservation.washerId}/reservation/${reservation.id}`)}}>
            Iniciar lavado
          </Button>
          <Button
            color="danger"
            className="mt-2"
            onPress={() => {cancelReservation(reservation.id)}}
          >
            Cancelar reserva
          </Button>
        </>
      )}
    </div>
  );
}