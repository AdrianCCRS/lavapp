import { useState } from "react";
import { Button } from "@heroui/button";
import { reserve } from "../services/reservations.service";

interface ReserveButtonProps {
  isDisabled: boolean;
  studentCode: string;
  washerId: string;
  userEmail: string;
}

export default function ReserveButton({
  isDisabled,
  studentCode,
  washerId,
  userEmail,
}: ReserveButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleReserve() {
    setLoading(true);
    try {
      await reserve(studentCode, washerId, userEmail);
      // Optionally show success toast here
    } catch (error) {
      // Optionally show error toast here
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      size="lg"
      radius="sm"
      color="default"
      isDisabled={isDisabled || loading} // disable while loading too
      onPress={handleReserve}
      isLoading={loading}
    >
      {loading ? "Reservando" : "Reservar"}
    </Button>
  );
}
