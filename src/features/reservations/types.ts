import { Timestamp } from "firebase/firestore";
import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

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
    studentCode: string;
    userEmail: string;
    expiresAt: Timestamp;
    createdAt: Timestamp;
    state: "waiting" | "cancelled" | "completed";
}

export interface Wash {
    washerId: string;
    studentCode: string;
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