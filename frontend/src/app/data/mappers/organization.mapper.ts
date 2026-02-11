import { Organization } from "../models/organization.model";
import { OrganizationDto } from "../dtos/organization.dto";

export class OrganizationMapper {
    //! Mapear DTO a modelo de dominio Organization
    static fromDto(dto: OrganizationDto): Organization {
        return {
            id: dto.id,
            name: dto.name,
            code: dto.code,
            slug: dto.slug,
            role: dto.role,
            createdAt: dto.created_at,
        };
    }
}
