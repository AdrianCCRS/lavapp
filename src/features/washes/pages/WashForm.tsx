import { Form } from "@heroui/form";
import { Textarea } from "@heroui/input";
import { NumberInput } from "@heroui/number-input";
import { Button } from "@heroui/button";
import { startWashing } from "../services/washes.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { WashForm } from "../types";
import { maxWashDurationInHours } from "~/src/utils/constants";
import { useAuth } from "@context/AuthContext"; 
import { Spinner } from "@heroui/spinner";
import { useParams } from "react-router-dom";

export default function WashForm() {
  const { customUser, loading } = useAuth();
  const {reservationId, washerId} = useParams<{ reservationId: string, washerId:string }>();
  const [error, setError] = useState<string | null>(null);
  const [hours, setHours] = useState(0);
  const [loadingWash, setLoadingWash] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: WashForm) => {
    try {
      setError(null);
      setLoadingWash(true);
      await startWashing(
        data.studentCode,
        data.washerId,
        data.duration,
        data.reservationId,
        data.news
      );
      setLoadingWash(false);
      navigate("current-wash");
    } catch (err) {
      setLoadingWash(false);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    }
  };

  if (loading) return <Spinner />;

  return (
    <Form
      className="w-auto max-w-md flex flex-col gap-4 p-6 border rounded-lg shadow-lg"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data: WashForm = {
          studentCode: customUser?.id || "",
          washerId: washerId || "",
          reservationId: reservationId || "",
          duration:
            parseFloat(formData.get("hours") as string || "0") +
            parseFloat(formData.get("minutes") as string || "0") / 60,
          news: (formData.get("news") as string) || "",
        };
        onSubmit(data);
      }}
    >
      <h1 className="w-full text-2xl text-center text-gray-600 mb-3">
        Iniciar lavada
      </h1>

      {error && (
        <div className="p-3 text-sm w-full text-center text-red-600 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <h2 className="text-text text-md">Tiempo de lavada</h2>
      <div className="flex gap-4">
        <NumberInput
          isRequired
          label="Horas"
          name="hours"
          validate={(value) => {
            if (value < 0 || value > Math.floor(maxWashDurationInHours)) {
              return `Debe ser entre 0 y ${Math.floor(maxWashDurationInHours)} horas`;
            }
            return true;
          }}
          onValueChange={(value) => setHours(value)}
        />

        <NumberInput
          isRequired
          label="Minutos"
          name="minutes"
          validate={(value) => {
            if (value < 0 || value > 59) {
              return "Debe ser entre 0 y 59 minutos";
            }
            const totalDuration = hours + value / 60;
            if (totalDuration > maxWashDurationInHours) {
              return `La duración total no puede exceder ${Math.floor(
                maxWashDurationInHours
              )} horas y ${Math.round(
                (maxWashDurationInHours % 1) * 60
              )} minutos`;
            }
            return true;
          }}
        />
      </div>

      <Textarea
        name="news"
        label="Observaciones de la lavadora"
        className="text-text"
        labelPlacement="outside"
        placeholder="Se encontró un calcetín rojo en la lavadora"
      />

      <div className="flex gap-2 justify-center w-full">
        <Button color="primary" type="submit" disabled={loadingWash}>
          {loadingWash ? "Iniciando lavada..." : "Iniciar lavada"}
        </Button>
        <Button type="reset" variant="flat">
          Cancelar
        </Button>
      </div>

      <p className="text-xs text-center text-gray-500">
        Si tiene alguna duda o problema al iniciar la lavada, por favor
        comuníquese con algún miembro de la junta.
      </p>
    </Form>
  );
}
