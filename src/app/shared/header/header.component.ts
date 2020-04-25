import { ChatService } from './../../services/chat.service';
import { InfoPaginaService } from './../../services/info-pagina.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  desplegable = true;
  constructor(public infoService: InfoPaginaService,
              public router: Router,
              public chatServ: ChatService) {
                this.ocultarMenu();
              }

  ngOnInit() {
    console.log("La resolución de tu pantalla es: " + innerWidth)
  }

  buscarProducto(termino: string) {
    console.log(termino);

    if (termino.length < 1 ) {
       return;
    }

    this.router.navigate(['/buscar', termino]);

  }

  ocultarMenu() {

    if ( innerWidth < 992) {
    if (this.desplegable === true) {
        this.desplegable = false;
    } else  {
      this.desplegable = true;
    }
    }
  }

}
