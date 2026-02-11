import { Injectable } from "@angular/core";
import { StoragePort } from "./storage.port";

@Injectable({ providedIn: "root" })
export class LocalStorageAdapter implements StoragePort {
    //! Guardar un valor en localStorage como JSON
    set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    //! Obtener un valor desde localStorage y convertirlo desde JSON
    get<T>(key: string): T | null {
        const raw = localStorage.getItem(key);

        //! Retornar null si no existe la clave
        if (!raw) return null;

        try {
            //! Parsear JSON y retornar tipado
            return JSON.parse(raw) as T;
        } catch {
            //! Retornar null si el JSON está corrupto o no se puede parsear
            return null;
        }
    }

    //! Eliminar una clave de localStorage
    remove(key: string): void {
        localStorage.removeItem(key);
    }
}
