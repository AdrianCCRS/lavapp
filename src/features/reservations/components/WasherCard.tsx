import { WashIcon, TimeIcon } from "./Icons"
import type { Washer } from "../types"
import ReserveButton from "./ReserveButton"
import { useAuth } from "@context/AuthContext"

export default function WasherCard(washerProps: Washer) {
    const { customUser } = useAuth();
    const studentCode = customUser?.id || null;
    const userEmail = customUser?.email || null;
    return (
        <div className="flex min-w-md bg-card flex-col h-auto w-auto items-center justify-center p-6 border border-slate-400 rounded-lg shadow-md">
            <div className="flex flex-col items-center justify-between w-full mb-4 sm:flex-row gap-4">
                <h1 className="text-text text-2xl">{washerProps.name}</h1>
                {washerProps.resting && (
                    <div className="flex gap-2 bg-orange-300 p-2 rounded items-center justify-center">
                        <TimeIcon size={25} color="#854d0e" />
                        <h3 className="text-md text-text-warning">En reposo</h3>
                    </div>
                )}
            </div>
            <WashIcon size={250} />
            <div>
                <h3>
                    Fin de la última lavada:{" "}
                    {washerProps.available
                        ? washerProps.lastUsed?.toDate().toLocaleString("es-CO", {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "numeric",
                              month: "short",
                          })
                        : "En curso"}
                </h3>
                <div className="flex flex-col items-center justify-center mt-4 gap-5">
                    {washerProps.available ? (
                        <h3 className="text-md mt-3 w-fit text-center bg-bg-success p-3 rounded text-text-success">
                            Estado: Disponible
                        </h3>
                    ) : (
                        <h3 className="text-md mt-3 w-fit text-center bg-bg-danger text-text-danger p-3 rounded ">
                            Estado: No disponible
                        </h3>
                    )}
                    {studentCode && userEmail && (
                        <ReserveButton
                            isDisabled={!washerProps.available}
                            studentCode={studentCode}
                            washerId={washerProps.id}
                            userEmail={userEmail}
                        />
                    )
                    }
                    
                </div>
            </div>
        </div>
    );
}
