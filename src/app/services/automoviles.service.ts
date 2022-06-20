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
    params = params.append('Marca', marca);
    return this.httpClient.get(this.resourceUrl, { params: params });
  }


  post(marca: string, anio: number, usado: boolean){
    this.get().subscribe((res: Automovil[]) => {
      this.idAutomoviles = res;
    });
    let auto = {
     id : this.idAutomoviles.length,
     Marca : marca,
     Anio : anio,
     Usado : usado
   }

   return this.httpClient.post(this.resourceUrl, auto);
  }


}
