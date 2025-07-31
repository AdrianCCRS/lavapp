import CurrentWashCard from '../components/CurrentWashCard';
import { useEffect, useState } from 'react';
import type { Wash } from '../types';
import { getCurrentWashes } from '../services/washes.service';
import { useAuth } from '@/context/AuthContext';
import { Spinner } from '@heroui/spinner';

export default function CurrentWashes() {
    const [currentWashes, setCurrentWashes] = useState<Wash[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const auth = useAuth();
    useEffect(() => {
        const fetchCurrentWashes = async () => {
            try {
                if (auth.customUser) {
                    const washes = await getCurrentWashes(auth.customUser.id);
                    setCurrentWashes(washes);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching current washes:", error);
            }
        };

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
                        <CurrentWashCard wash={wash} />
                    ))
                )}
            </div>
        </div>
    );
};