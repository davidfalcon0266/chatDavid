import { ProductosService } from './services/productos.service';
import { InfoPaginaService } from './services/info-pagina.service';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  chats: Observable<any[]>;

  constructor(public infoService: InfoPaginaService,
              public productoServi: ProductosService,
              public db: AngularFirestore) {

                this.chats = db.collection('chats').valueChanges();

  }
}
