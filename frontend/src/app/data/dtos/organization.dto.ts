export interface OrganizationDto {
    id: string;
    name: string;
    code: string;
    slug?: string;
    role: "owner" | "admin" | "viewer";
    created_at: string;
}
