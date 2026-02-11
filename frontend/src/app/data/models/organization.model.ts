export type OrganizationRole = "owner" | "admin" | "viewer";

export interface Organization {
    id: string;
    name: string;
    code: string;      // para “buscar por código” luego
    slug?: string;
    role: OrganizationRole; // rol del usuario en esa org
    createdAt: string;
}
