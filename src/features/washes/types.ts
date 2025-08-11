import { Timestamp } from "firebase/firestore";

export { Timestamp };

export interface WashForm {
    washerId: string;
    studentCode: string;
    reservationId: string;
    duration: number;
    news: string;
}

export interface Wash {
    id: string;
    washerId: string;
    studentCode: string;
    startTime: Timestamp;
    endTime?: Timestamp;
    reservationId: string;
    duration: number;
    news: string;
}