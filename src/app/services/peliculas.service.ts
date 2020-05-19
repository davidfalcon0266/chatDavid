import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  public apiKey = '84c92bb0483e8a26c408a862b4ba745e';
  public urlMovieDb = 'https://api.themoviedb.org/3';
  public noEncontrado = false;

  loading: boolean;
  desde = new Date();
  hasta = new Date();
  desdeStr: any;
  hastaStr: any;
  peliculas: any[] = [];
  cartelera: any;

  constructor(public http: HttpClient) {
    this.loading = false;
  }

  getCartelera() {
    this.loading = true;

    this.hasta.setDate(this.hasta.getDate() + 7);
    if (this.desde.getMonth() < 10 && this.desde.getDate() < 10) {
      this.desdeStr = `${this.desde.getFullYear()}-0${this.desde.getMonth() + 1}-0${this.desde.getDate()}`;
    } else if (this.desde.getDate() < 10) {
      this.desdeStr = `${this.desde.getFullYear()}-${this.desde.getMonth() + 1}-0${this.desde.getDate()}`;
    } else
    if (this.desde.getMonth() < 10) {
      this.desdeStr = `${this.desde.getFullYear()}-0${this.desde.getMonth() + 1}-${this.desde.getDate()}`;
    } else {
      this.desdeStr = `${this.desde.getFullYear()}-${this.desde.getMonth() + 1}-${this.desde.getDate()}`;
    }
    if (this.hasta.getDate() < 10 && this.hasta.getMonth() < 10) {
      this.hastaStr = `${this.hasta.getFullYear()}-0${this.hasta.getMonth() + 1}-0${this.hasta.getDate()}`;
    } else
    if (this.hasta.getMonth() < 10) {
      this.hastaStr = `${this.hasta.getFullYear()}-0${this.hasta.getMonth() + 1}-${this.hasta.getDate()}`;
    } else
    if (this.hasta.getDate() < 10) {
      this.hastaStr = `${this.hasta.getFullYear()}-${this.hasta.getMonth() + 1}-0${this.hasta.getDate()}`;
    } else {
      this.hastaStr = `${this.hasta.getFullYear()}-${this.hasta.getMonth() + 1}-${this.hasta.getDate()}`;
    }

    const ur = `${this.urlMovieDb}/discover/movie?primary_release_date.gte=${this.desdeStr}
&primary_release_date.lte=${this.hastaStr}&api_key=${this.apiKey}&language=es&page=1`;
    return this.http.get(ur).subscribe((data: any) => {
      this.loading = false;
      this.cartelera = data.results;
    }, error => {
      this.loading = false;

    });
  }

  getPopulares() {
    return this.http.get(`${this.urlMovieDb}/discover/movie?sort_by=popularity.desc&api_key=${this.apiKey}&language=es&page=1`);
  }

  getPopularesNinos() {
    return this.http.get(`${this.urlMovieDb}/discover/movie?certification_country=US&certification.lte=
G&sort_by=popularity.desc&api_key=${this.apiKey}&language=es&page=1`);
  }

  buscarPeliculas(texto: string) {
    this.loading = true;
    this.noEncontrado = false;
    return this.http.get(`${this.urlMovieDb}/search/movie?query=${texto}
&sort_by=popularity.desc&api_key=${this.apiKey}&language=es&page=1`).subscribe((data: any) => {
      this.loading = false;

      this.peliculas = data.results;
      if (this.peliculas.length === 0) {
        this.noEncontrado = true;
      }
    }, error => {
      console.log(error);
      this.loading = false;

    });
  }

  buscarById(id: any) {
    return this.http.get(`${this.urlMovieDb}/movie/${id}?api_key=${this.apiKey}&language=es&page=1`);
  }



}
