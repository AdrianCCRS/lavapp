import { useAuth } from "@context/AuthContext";
import ReservationsTable from "../components/ReservationsTable";
import { useState } from "react";
import type { Reservation, Timestamp } from "../types";
import { getReservationsByDate } from "../services/reservations.service";
import ReservationDateCard from "../components/ReservationDateCard";

export default function UserReservations() {
    const { customUser } = useAuth();
    const [reservations, setReservations] = useState<Reservation[] | null>(null);
    const [filterDate, setFilterDate] = useState<Timestamp | null>(null);

    return (
        <>
        <div className="xl:grid xl:grid-cols-3 xl:mt-28 flex flex-col gap-16 justify-center w-full h-auto p-6 ">
            <div className="flex justify-center items-center flex-col gap-5">
                <h1 className="text-text text-2xl font-bold" >Historial de reservas</h1>
                {customUser &&  <ReservationsTable
                userId={customUser.id}
                externalReservations={reservations}
                />}
            </div>
            <div className="flex items-center justify-center">
            {customUser && <ReservationDateCard
                onFilter={async (date) => {
                setFilterDate(date);
                const filtered = await getReservationsByDate(date, customUser.id);
                setReservations(filtered);
                }}
                onClear={() => {
                setFilterDate(null);
                setReservations(null);
                }}
            />}
            </div>

        </div>
        </>
    );
}