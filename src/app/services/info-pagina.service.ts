import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina-info';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  urlEquipo = 'https://angular-html-570d3.firebaseio.com/equipo.json';

  info: InfoPagina = {};
  cargada = false;
  constructor(public http: HttpClient) {
   this.cargarInfo();
  }

 public cargarInfo() {
  return  this.http.get('assets/data/data-pagina.json').subscribe((data: InfoPagina) => {
      this.info = data;
      this.cargada = true;
      return this.info;
    });
  }

  public cargarEquipo() {
   return this.http.get(this.urlEquipo);
  }

}
