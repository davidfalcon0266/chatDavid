import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from './../models/usuarios.model';
import { Mensajes } from './../interfaces/mensajes';
import { Injectable } from '@angular/core';
// esto lo traemos d la documentacion de angularfire..de la parte de coleccion
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  apiKey = 'AIzaSyA9ceMo04OQxb9tHKH16VNKhwpKHgyVOmg';





   private itemsCollection: AngularFirestoreCollection<Mensajes>;
   public persona: any = [{
     nombre: '',
     uid: ''
   }];
   private chats: Mensajes[] = [];
                                                // para autentificarnos
  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              private http: HttpClient,
              private router: Router
    ) {
// con esto recibimos e usuraio que hemos registrado
    this.afAuth.authState.subscribe( user => {
     if (!user) {
            console.log('no hay usuario');
            return;
       }
     this.persona.nombre = user.displayName;
     this.persona.uid = user.uid;
   });

  }

  loginLocal(usuario: Usuario ) {
    const user = {
      email: usuario.correo,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`, user).subscribe((data: any) => {
      this.persona.nombre = data.email;
      this.persona.uid = data.localId;
      Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: data.message,
        });
      this.router.navigateByUrl('/chat');
      return;
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error.error.message,
      });
      return;
    });
  }

  register(usuario: Usuario) {

  const user = {
    email: usuario.correo,
    password: usuario.password,
    returnSecureToken: true
  };

  const headers = { headers: new HttpHeaders({ 'Content-type': 'application/json' })};
  return this.http.post(`${this.url}signUp?key=${this.apiKey}`, user, headers);
  }



  login(proveedor: string) {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.persona = [];
    this.afAuth.auth.signOut();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensajes>(
      'chats',
      // aqui mandamos un sql para ordenr los mensajes como queeremos
      ref => ref.orderBy('fecha', 'desc').limit(9)
    );

    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensajes[]) => {
        this.chats = [];
        for (const mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
      })
    );
  }

  GuardarMensajes(text: string) {
    const mensaje: Mensajes = {

      nombre: this.persona.nombre,
      mensaje: text,
      fecha: new Date().getTime(),
      uid: this.persona.uid
    };
    // post message a bd
    return this.itemsCollection.add(mensaje);
  }
}
