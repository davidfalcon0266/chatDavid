import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcion } from 'src/app/interfaces/producto-description';
import { InfoPaginaService } from 'src/app/services/info-pagina.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoDescripcion;
  id: string;
  anio: number = new Date().getFullYear();
  constructor(public route: ActivatedRoute,
              public productoServices: ProductosService,
              public infoService: InfoPaginaService) { }

  ngOnInit() {

    this.route.params.subscribe(parametros => {
      this.productoServices.obtenerProducto(parametros['id']).subscribe((data: ProductoDescripcion) => {
        this.id = parametros['id'];
        this.producto = data;
      });
    });
  }

}
