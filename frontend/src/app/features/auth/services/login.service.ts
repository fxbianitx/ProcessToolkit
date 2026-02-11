import { User } from 'app/data/models/user.model';
import { UserDto } from 'app/data/dtos/user.dto';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '@core/services/base-api.service';

interface LoginRequest { email: string; password: string; }

interface LoginResponse { token: string; }

@Injectable({ providedIn: 'root' })
class LoginService extends BaseApiService {

    //! Iniciar logeo con credenciales
    login(data: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login/credentials`, data);
    }

    //! Iniciar logeo con google
    loginWithGoogle(): Observable<LoginResponse> {
        return this.http.get<LoginResponse>(`${this.baseUrl}/auth/login/google`);
    }

    //! Obtener informacion del usuario
    getCurrentUser(): Observable<UserDto> {
        return this.http.get<UserDto>(`${this.baseUrl}/auth/me`);
    }

}

export { LoginService }