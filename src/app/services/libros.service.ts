import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Libro } from '../models/libros';

@Injectable({
  providedIn: 'root',
})
export class LibrosService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = environment.ConexionWebApiProxy + 'Libros/';
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  put(Id: number, obj: Libro) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }



}
