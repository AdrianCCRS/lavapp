import { Timestamp } from "firebase/firestore";
import type { QueryDocumentSnapshot, DocumentData, QuerySnapshot } from "firebase/firestore";

export {Timestamp};

export interface Washer{
    id: string;
    name: string;
    available: boolean;
    broken: boolean;
    resting: boolean;
    lastUsed: Timestamp;
}

export interface Reservation {
    id?: string;
    washerId: string;
    userId: string;
    userEmail: string;
    createdAt: Timestamp;
}

export interface Wash {
    washerId: string;
    userId: string;
    startTime: Timestamp;
    endTime: Timestamp | null;
    maxDuration: Timestamp;
    notes: string;
}

export interface ReservationCardProps {
    washerId: string;
    createdAt: Timestamp;
}

export interface PaginatedReservations {
    reservations: Reservation[];
    lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData>;

}