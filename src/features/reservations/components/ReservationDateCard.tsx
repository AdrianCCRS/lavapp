import { Form } from "@heroui/form";
import { DatePicker } from "@heroui/date-picker";
import { Button } from "@heroui/button";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import type { DateValue } from "@internationalized/date";

export default function ReservationDateCard({
  onFilter,
  onClear,
}: {
  onFilter: (date: Timestamp) => void;
  onClear: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      const jsDate = new Date(
        selectedDate.year,
        selectedDate.month - 1,
        selectedDate.day,
        0, 0, 0
      );
      const timestamp = Timestamp.fromDate(jsDate);
      console.log("Fecha enviada al filtro:", jsDate.toString());
      onFilter(timestamp);
    }
  };
  

  return (
    <div className="flex flex-col items-center gap-5">
    <h1 className="text-text font-bold text-2xl"> Buscar reserva por fecha</h1>
    <Form onSubmit={handleSubmit} className="flex gap-4 items-center mb-4 border p-4 rounded-lg bg-card shadow-lg">
      <DatePicker value={selectedDate} onChange={setSelectedDate} aria-label="Seleccionar una fecha"/>
      <div className="flex gap-2">
        <Button type="submit" color="primary">
            Buscar
        </Button>
        <Button type="button" variant="ghost" onPress={onClear}>
            Limpiar filtro
        </Button>
      </div>
    </Form>
    </div>
  );
}
