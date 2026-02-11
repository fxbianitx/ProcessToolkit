export interface UserDto {
    id: number;
    code: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    last_login_at: string | null; 
}