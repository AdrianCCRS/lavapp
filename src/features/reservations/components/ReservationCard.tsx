import type { ReservationCardProps } from "../types";


export default function ReservationCard(props: ReservationCardProps) {
    const { washerId, createdAt } = props;

    return (
        <div className="flex min-w-md bg-card flex-col h-auto w-auto items-center justify-center p-6 border border-slate-400 rounded-lg shadow-md">
            <h1 className="text-text text-2xl">Lavadora ID: {washerId}</h1>
            <h3 className="text-md mt-3 w-fit text-center bg-bg-success p-3 rounded text-text-success">
                Reservada el: {createdAt.toDate().toLocaleString("es-CO", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "numeric",
                    month: "short",
                })}
            </h3>
        </div>
    );

}