import { ChatService } from './../../services/chat.service';
import { InfoPaginaService } from './../../services/info-pagina.service';
import { Component, OnInit, HostListener  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  desplegable = true;
  color = 'navbar-light';
  fondo = 'navbar navbar-expand-lg';
  texto = 'text:dark';
  constructor(public infoService: InfoPaginaService,
              public router: Router,
              public chatServ: ChatService) {
                this.ocultarMenu();
              }

  ngOnInit() {
  }

  @HostListener('window:scroll', ['$event'])

  doSomethingOnWindowsScroll($event: any) {
     const scrollOffset = $event.srcElement.children[0].scrollTop;
     console.log('window scroll: ',  scrollOffset);
     if (scrollOffset > 150) {
      this.color = 'bg-dark';
      this.texto = 'text-white';
     } else {
       this.color = 'navbar-light';
       this.texto = 'text:dark';
     }
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
