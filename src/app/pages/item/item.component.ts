import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcion } from 'src/app/interfaces/producto-description';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion;
  id: string;

  constructor(private route: ActivatedRoute,
              private productoServices: ProductosService) { }

  ngOnInit() {

    this.route.params.subscribe(parametros => {
      this.productoServices.obtenerProducto(parametros['id']).subscribe((data: ProductoDescripcion) => {
        this.id = parametros['id'];
        this.producto = data;
      });
    });
  }

}
