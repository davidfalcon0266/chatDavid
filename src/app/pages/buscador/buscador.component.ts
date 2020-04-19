import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  termino: string;
  constructor(private router: ActivatedRoute,
              private productoServices: ProductosService) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      console.log(params['termino']);
      this.termino = params['termino'];
      this.productoServices.buscarProducto(params['termino']);
    });
  }

}
