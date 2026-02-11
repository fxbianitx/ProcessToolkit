import { Injectable } from "@angular/core";
import { User } from "app/data/models/user.model";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
class AuthStateService {
    //! BehaviorSubject mantiene el usuario y permite que componentes se suscriban
    private userSubject = new BehaviorSubject<User | null>(null);
    public user$ = this.userSubject.asObservable();

    //! Guardar usuario
    setUser(user: User | null) {
        this.userSubject.next(user);
    }

    //! Limpiar usuario (logout)
    clearUser() {
        this.userSubject.next(null);
    }

    //! Obtener el usuario actual (no observable)
    get currentUser(): User | null {
        return this.userSubject.value;
    }
}

export { AuthStateService}