import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peliculasPipe'
})
export class PeliculasPipePipe implements PipeTransform {

  transform(pelicula: any, mostrar2: boolean = false): any {

    const url = 'http://image.tmdb.org/t/p/w300';
    if (mostrar2) {
      if (pelicula.poster_path !== null) {
        return url + pelicula.poster_path;
    } else {
      return 'assets/img/noimage.gif';
    }
  }

    if (pelicula.backdrop_path !== null) {
      return url + pelicula.backdrop_path;
    } else if (pelicula.poster_path !== null) {
      return url + pelicula.poster_path;
    } else {
      return 'assets/img/noimage.gif';
    }
  }

}
