import CurrentWashCard from '../components/CurrentWashCard';
import { useEffect, useState } from 'react';
import type { Wash } from '../types';
import { getCurrentWashes } from '../services/washes.service';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@heroui/spinner';
import { handleFirestoreErrorOnly } from "~/src/utils/informationHandler";

export default function CurrentWashes() {
    const [currentWashes, setCurrentWashes] = useState<Wash[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const auth = useAuth();
    
    const fetchCurrentWashes = async () => {
        const result = await handleFirestoreErrorOnly(async () => {
            if (auth.customUser) {
                const washes = await getCurrentWashes(auth.customUser.id);
                setCurrentWashes(washes);
                setIsLoading(false);
            } else {
                throw new Error("Usuario no autenticado");
            }
        }, {
            errorTitle: "Error al obtener lavadas en curso",
            errorMessage: "No se pudieron obtener las lavadas en curso. Intenta nuevamente.",
        });

        if (!result) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentWashes();
    }, [auth.customUser]);

    return (
        <div>
            <h1 className='text-2xl font-bold text-text text-center my-3'>Lavadas en curso</h1>
            <div className='flex flex-col gap-4'>
                {isLoading ? (
                    <Spinner />
                ) : (
                    currentWashes.map((wash) => (
                        <CurrentWashCard 
                            key={wash.id} 
                            wash={wash} 
                            onWashEnded={fetchCurrentWashes}
                        />
                    ))
                )}
            </div>
        </div>
    );
};