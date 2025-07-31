import { useCountdown } from "@/hooks/useCountdown";
import type { Wash } from "../types";
import { Button } from "@heroui/button";
import { TimeInput } from "@heroui/date-input";

import { restingTimeInMinutes } from "@/utils/constants";
import { Time } from "@internationalized/date";
import {Alert} from "@heroui/alert";

export default function CurrentWashCard({ wash }: { wash: Wash }) {
  const maxTimeToEnd = wash.startTime.toDate().getTime() + wash.duration * 60 * 1000 + restingTimeInMinutes * 60 * 1000; 
  const startTime = wash.startTime.toDate();
  const expiresAt = new Date(maxTimeToEnd);

  const { minutes, seconds, isExpired } = useCountdown(expiresAt);

  return (
    <div className="flex flex-col border rounded-lg p-4 bg-white shadow">
      <span className="text-md text-gray-500 m-3 ms-0">
        Lavadora: <strong>{wash.washerId}</strong>
      </span>
    <div className="flex gap-2">
      <TimeInput
        isReadOnly
        label="Hora de inicio"
        defaultValue={new Time(startTime.getHours(), startTime.getMinutes(), startTime.getSeconds())}
        />
      <TimeInput
        isReadOnly
        label="Hora máxima para finalizar"
        defaultValue={new Time(expiresAt.getHours(), expiresAt.getMinutes(), expiresAt.getSeconds())}
        />
    </div>

    {isExpired ? (
      <div className="flex flex-col items-center">
        <Alert 
          className="mt-2" 
          color="danger" 
          title="El tiempo máximo para finalizar el lavado ha expirado" 
          description="Se le cargará una multa, si tiene alguna queja, por favor comuníquese con alguien de la junta." 
          variant="flat" 
        />
        <Button color="default" className="mt-2 w-min" variant="solid">He leído y acepto</Button>
      </div>
      ) : (
        <span className="text-green-600 font-medium">
          Tiempo restante para finalizar: {minutes}m {seconds}s
        </span>
      )}

      {!isExpired && (
        <Button color="primary" className="mt-2">
          Finalizar lavada
        </Button>
      )}
    </div>
  );
}