import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable()
abstract class BaseApiService {

    //! Obtener url dinamica (Produccion / Desarrollo)
    protected baseUrl = environment.apiUrl;

    //! Constructor
    constructor(protected http: HttpClient) { }
    
}


export { BaseApiService };