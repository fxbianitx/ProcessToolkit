import { Injectable } from "@angular/core";
import { BaseApiService } from '@core/services/base-api.service';
import { Observable, map } from "rxjs";
import { Organization } from "@data/models/organization.model";
import { OrganizationDto } from "@data/dtos/organization.dto";
import { CreateOrganizationDto } from "../data/dtos/create-organization.dto";
import { OrganizationMapper } from "@data/mappers/organization.mapper";

@Injectable({ providedIn: "root" })
class OrganizationApiService extends BaseApiService {

    //! Obtener organizaciones del usuario
    listMyOrgs$(): Observable<Organization[]> {
        return this.http.get<OrganizationDto[]>(`${this.baseUrl}/orgs`).pipe(
            map((dtos) => dtos.map(OrganizationMapper.fromDto))
        );
    }

    //! Crear organización y retornar la organización creada (usuario queda como owner)
    createOrg$(payload: CreateOrganizationDto): Observable<Organization> {
        return this.http.post<OrganizationDto>(`${this.baseUrl}/orgs`, payload).pipe(
            map(OrganizationMapper.fromDto)
        );
    }

    //! Obtener organización por id (para dashboard/settings)
    getOrgById$(orgId: string): Observable<Organization> {
        return this.http.get<OrganizationDto>(`${this.baseUrl}/orgs/${orgId}`).pipe(
            map(OrganizationMapper.fromDto)
        );
    }
}

export { OrganizationApiService }
