import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos: any[] = [];
  productoFiltrado: any[] = [];
  loading = false;
  urlProductos = 'https://angular-html-570d3.firebaseio.com/productos_idx.json';
  urlProducto = 'https://angular-html-570d3.firebaseio.com/productos/';

  constructor(public http: HttpClient) {
    this.cargarProductos();
  }

  cargarProductos() {
   this.loading = true;

   return new Promise((resolve, reject) => {
    return this.http.get(this.urlProductos).subscribe((data: []) => {
      this.productos = data;
      this.loading = false;
      resolve();
    });
   });
  }

  obtenerProducto(idProducto: string) {
    return this.http.get(this.urlProducto + `${idProducto}` + '.json' );
  }

  buscarProducto(termino: string) {
  if (this.productos.length === 0) {
    //  lo hacemos por que los productos no estaban cargados al principio
     this.cargarProductos().then( () => {
       this.cargarProductosFiltrados(termino);
     });
  } else {
    this.cargarProductosFiltrados(termino);
  }

  }

  cargarProductosFiltrados(termino: string) {
    this.productoFiltrado = [];
    termino = termino.toLowerCase();
    this.productos.forEach(prod => {
      const prodLowerCase = prod.titulo.toLowerCase();
      if (prod.categoria.indexOf(termino) >= 0 || prodLowerCase.indexOf(termino) >= 0) {
        this.productoFiltrado.push(prod);
      }
    });
  }
}
