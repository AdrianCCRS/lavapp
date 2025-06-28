import { Timestamp } from "firebase/firestore";

export interface Washer{
    id: string;
    name: string;
    available: boolean;
    broken: boolean;
    resting: boolean;
    lastUsed: Timestamp;
}

export interface Reservation {
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