import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ContactoCorporativo, Corporativo } from '../_models/corporativo';
import { UpdateCorporativoForm } from '../_models/update-corporativo-form';
import { UpdateCreateContactoForm } from '../_models/create-update-contacto-form';

@Injectable({
  providedIn: 'root'
})
export class CorporativosService {
  private readonly _apiURL = environment.apiURL;
  private readonly auth_token = 'Bearer ' + localStorage.getItem('tokenscloud');

  constructor(
    private _httpClient: HttpClient
  ) { }

  private get _headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: this.auth_token
    });
  }

  public getCorporativos(): Observable<Corporativo[]> {
    return this._httpClient.get<any>(`${this._apiURL}/corporativos`, { headers: this._headers }).pipe(
      map((data) => data.data)
    );
  }

  public getCorporativo(id: number): Observable<Corporativo> {
    return this._httpClient.get<any>(`${this._apiURL}/corporativos/${id}`, { headers: this._headers }).pipe(
      map((data) => data.data.corporativo)
    );
  }

  public updateCorporativo(id: number, body: UpdateCorporativoForm): Observable<Corporativo> {
    return this._httpClient.put<any>(`${this._apiURL}/corporativos/${id}`, body, { headers: this._headers }).pipe(
      map((data) => data.data)
    );
  }

  public createContacto(body: UpdateCreateContactoForm): Observable<ContactoCorporativo> {
    return this._httpClient.post<any>(`${this._apiURL}/contactos`, body, { headers: this._headers }).pipe(
      map((data) => data.data)
    );
  }

  public updateContacto(id: number, body: UpdateCreateContactoForm): Observable<ContactoCorporativo> {
    return this._httpClient.put<any>(`${this._apiURL}/contactos/${id}`, body, { headers: this._headers }).pipe(
      map((data) => data.data)
    );
  }

  public deleteContacto(id: number): Observable<any> {
    return this._httpClient.delete<any>(`${this._apiURL}/contactos/${id}`, { headers: this._headers }).pipe(
      map((data) => data)
    );
  }
}
