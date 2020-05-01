import { Router } from '@angular/router';
import { PeliculasService } from './../../services/peliculas.service';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';

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
              public router: Router
  ) {
      this.getPopulares();
      this.getPopularesNinos();
  }

  ngOnInit() {
  }


  getCarteleras() {
    this.peli.getCartelera();
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
      this.cartelera = this.peli.cartelera;

    });
  }

}
