import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '@core/services/base-api.service';
import { RegisterCompleteRequest, RegisterCompleteResponse, RegisterStartRequest, RegisterStartResponse, RegisterVerifyRequest, RegisterVerifyResponse } from '@auth/dtos/register.dtos';


@Injectable({ providedIn: 'root' })
export class RegisterService extends BaseApiService {

    //! Ingresar credenciales de inicio
    start(payload: RegisterStartRequest): Observable<RegisterStartResponse> {
        return this.http.post<RegisterStartResponse>(`${this.baseUrl}/auth/register/start`, payload);
    }

    //! Verificar correo electronico
    verify(payload: RegisterVerifyRequest): Observable<RegisterVerifyResponse> {
        return this.http.post<RegisterVerifyResponse>(`${this.baseUrl}/auth/register/verify`, payload);
    }

    //! Reenviar el codigo de verificacion al correo
    resend(payload: { registration_token: string }) {
        return this.http.post(`${this.baseUrl}/auth/register/resend`, payload);
    }

    //! Completar datos de usuario
    complete(payload: RegisterCompleteRequest): Observable<RegisterCompleteResponse> {
        return this.http.post<RegisterCompleteResponse>(`${this.baseUrl}/auth/register/complete`, payload);
    }
}
