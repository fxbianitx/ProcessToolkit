export interface User {
    id: number;
    code: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    lastLogin: Date | null;
}