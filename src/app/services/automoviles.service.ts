import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Automovil } from '../models/automoviles';

@Injectable({
  providedIn: 'root',
})
export class AutomovilesService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = environment.ConexionWebApiProxy + 'Automoviles/';
  }

  idAutomoviles: Automovil[] = [];

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  getMarca(marca: string) {
    let params = new HttpParams();

    if (marca != null && marca != '') {
      params = params.append('Marca', marca);
    }
    return this.httpClient.get(this.resourceUrl, { params: params });
  }

  post(auto: Automovil) {
    return this.httpClient.post(this.resourceUrl, auto);
  }
}
