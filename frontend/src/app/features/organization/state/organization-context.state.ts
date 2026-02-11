import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Organization } from "@data/models/organization.model";
import { LocalStorageAdapter } from "@auth/storage/local-storage.adapter"; // ajusta ruta real

@Injectable({ providedIn: "root" })
export class OrganizationContextState {
    //! Definir clave para persistir la organización seleccionada
    private key = "current_org";

    //! Mantener organización actual en memoria
    private orgSubject = new BehaviorSubject<Organization | null>(null);
    public org$ = this.orgSubject.asObservable();

    constructor(private storage: LocalStorageAdapter) {
        //! Cargar organización desde storage al iniciar
        const saved = this.storage.get<Organization>(this.key);
        if (saved) this.orgSubject.next(saved);
    }

    //! Setear organización actual y persistir en storage
    setCurrent(org: Organization): void {
        this.orgSubject.next(org);
        this.storage.set(this.key, org);
    }

    //! Limpiar organización actual (logout o cambio)
    clear(): void {
        this.orgSubject.next(null);
        this.storage.remove(this.key);
    }

    //! Obtener snapshot actual (sync)
    get current(): Organization | null {
        return this.orgSubject.value;
    }
}
