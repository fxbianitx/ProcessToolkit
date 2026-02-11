import { Injectable } from "@angular/core";
import { LocalStorageAdapter } from "../storage/local-storage.adapter";

export interface PendingRegisterSession {
    email: string;
    registrationToken: string;
    expiresAt: string; // ISO string
}

@Injectable({ providedIn: "root" })
export class AuthRegisterFlowState {
    //! Definir clave única para guardar la sesión temporal del registro
    private key = "pending_register";

    //! Inyectar StoragePort para no depender directamente de localStorage
    constructor(private storage: LocalStorageAdapter) { }

    //! Iniciar sesión de registro pendiente (persistir por storage)
    start(session: PendingRegisterSession): void {
        this.storage.set(this.key, session);
    }

    //! Obtener sesión de registro pendiente (leer por storage)
    get(): PendingRegisterSession | null {
        return this.storage.get<PendingRegisterSession>(this.key);
    }

    //! Limpiar sesión de registro pendiente (eliminar por storage)
    clear(): void {
        this.storage.remove(this.key);
    }
}