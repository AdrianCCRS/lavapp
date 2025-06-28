export type LoginForm = {
    email: string;
    password: string;
}

export type User = {
    id: string;
    firstName: string;
    secondName: string;
    firstLastName: string;
    secondLastName: string;
    email: string;
    role: "user" | "fiscal";
}