import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutomovilesService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = environment.ConexionWebApiProxy + 'Automoviles/';
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  getMarca(marca: string) {
    let params = new HttpParams();
    params = params.append('Marca', marca);
    return this.httpClient.get(this.resourceUrl, { params: params });
  }
}
