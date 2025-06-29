import { useAuth } from "@context/AuthContext";
import ReservationsTable from "../components/ReservationsTable";

export default function UserReservations() {
    const { customUser } = useAuth();
    return (
        <>
        <div className="xl:grid xl:grid-cols-3 xl:mt-28 flex justify-center w-full h-auto p-6 ">
            <div className="flex justify-center items-center flex-col gap-5">
                <h1 className="text-text text-2xl font-bold" >Historial de reservas</h1>
                {customUser && <ReservationsTable userId={customUser.id} />}
            </div>
        </div>
        </>
    );
}