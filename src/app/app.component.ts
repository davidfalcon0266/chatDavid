import { ProductosService } from './services/productos.service';
import { InfoPaginaService } from './services/info-pagina.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portafolio';

  constructor(public infoService: InfoPaginaService,
              public productoServi: ProductosService) {

  }
}
