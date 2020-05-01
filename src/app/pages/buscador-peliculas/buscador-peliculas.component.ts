import { PeliculasService } from './../../services/peliculas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador-peliculas',
  templateUrl: './buscador-peliculas.component.html',
  styleUrls: ['./buscador-peliculas.component.css']
})
export class BuscadorPeliculasComponent implements OnInit {

  buscar = '';

  constructor(public servi: PeliculasService) { }

  ngOnInit() {
  }

 buscarPeliculas() {
 this.servi.buscarPeliculas(this.buscar);
 }


}
