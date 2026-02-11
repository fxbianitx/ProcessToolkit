export interface StoragePort {
    // Guardar un valor serializable asociado a una clave
    set<T>(key: string, value: T): void;

    // Obtener un valor por clave y tiparlo (retornar null si no existe o falla)
    get<T>(key: string): T | null;

    // Eliminar un valor asociado a una clave
    remove(key: string): void;
}
