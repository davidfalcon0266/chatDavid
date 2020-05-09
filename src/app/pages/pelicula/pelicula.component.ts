import { PeliculasService } from './../../services/peliculas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  pelicula: any;
  regresar = '';
  busqueda = '';
  loading: boolean;

  constructor(public route: ActivatedRoute,
              public servi: PeliculasService ) {
                this.loading = false;
              }

  ngOnInit() {
    this.loading = true;

    this.route.params.subscribe((data: any) => {
      this.regresar = data.pag;
      this.busqueda = data.busqueda;
      this.servi.buscarById(data.id).subscribe((pelicula: any[]) => {
        this.loading = false;

        this.pelicula = pelicula;
        console.log(this.pelicula);
      }, error => {
        this.loading = false;

      });
    });
  }

}
