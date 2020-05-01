import { PeliculasService } from './services/peliculas.service';
import { async } from '@angular/core/testing';
import { ChatService } from './services/chat.service';
import { ProductosService } from './services/productos.service';
import { InfoPaginaService } from './services/info-pagina.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
declare var particlesJS: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  chats: Observable<any[]>;

  constructor(public infoService: InfoPaginaService,
              public productoServi: ProductosService,
              public db: AngularFirestore,
              public chatServi: ChatService,
              public servi: PeliculasService) {
                this.servi.getCartelera();

                this.chats = db.collection('chats').valueChanges();

  }
 async ngOnInit() {
    particlesJS.load('particles-js', 'assets/particles.json');
  }

}
