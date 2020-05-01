import { PeliculasService } from './../../services/peliculas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit {

  cartelera: any;
  populares: any;
  popularesNinos: any;
  constructor(public peli: PeliculasService,
  ) {


  }

  ngOnInit() {
    this.getCarteleras();
    this.getPopulares();
    this.getPopularesNinos();
  }


  getCarteleras() {
    this.peli.getCartelera().subscribe((data: any) => {
      console.log(data.results);
      this.cartelera = data.results;
    });
  }



  getPopulares() {
    this.peli.getPopulares().subscribe((data: any) => {
      console.log(data.results);
      this.populares = data.results;
    });
  }

  getPopularesNinos() {
    this.peli.getPopularesNinos().subscribe((data: any) => {
      console.log('niños', data.results);
      this.popularesNinos = data.results;
    });
  }

}
