import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { OrganizationApiService } from "./organization-api.service";
import { OrganizationContextState } from "@organization/state/organization-context.state";
import { Organization } from "@data/models/organization.model";
import { CreateOrganizationDto } from "@organization/data/dtos/create-organization.dto";

@Injectable({ providedIn: "root" })
export class OrganizationFacade {
    //! Exponer organización actual como observable
    org$ = this.ctx.org$;

    constructor(
        private api: OrganizationApiService,
        private ctx: OrganizationContextState
    ) { }

    //! Listar organizaciones del usuario
    listMyOrgs$(): Observable<Organization[]> {
        return this.api.listMyOrgs$();
    }

    //! Crear organización y setearla como actual
    createAndSelect$(payload: CreateOrganizationDto): Observable<Organization> {
        return this.api.createOrg$(payload).pipe(
            tap((org) => this.ctx.setCurrent(org))
        );
    }

    //! Seleccionar organización existente como actual
    select(org: Organization): void {
        this.ctx.setCurrent(org);
    }

    //! Obtener snapshot actual
    get current(): Organization | null {
        return this.ctx.current;
    }
}
