import { HttpClient } from '@angular/common/http';
import { Usuario } from './../models/usuarios.model';
import { Mensajes } from './../interfaces/mensajes';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public loading: boolean;
  public userLogg: boolean;
  public itemsCollection: AngularFirestoreCollection<Mensajes>;
  public persona: any = [{
    nombre: '',
    uid: ''
  }];
  public chats: Mensajes[] = [];
  public confirmoSalida: boolean;
  constructor(public afs: AngularFirestore,
              public afAuth: AngularFireAuth,
              public http: HttpClient,
              public router: Router
  ) {
    // con esto recibimos e usuraio que hemos registrado
    this.afAuth.authState.subscribe(user => {
      console.log(user);
      if (!user) {
        this.userLogg = false;
        return;
      }
      this.userLogg = true;
      this.persona.nombre = user.email;
      this.persona.uid = user.uid;
    }, error => {
      console.log(error);
    });
  }

  loginGoogle() {
    return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  login(mail: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(mail, password);
  }

  restablecerPassword(mail: string) {
    return this.afAuth.auth.sendPasswordResetEmail(mail);
  }

  public register(mail: string, password: string): Promise<void> {
    this.loading = true;
    return this.afAuth.auth.createUserWithEmailAndPassword(mail, password).then(async (user) => {
      this.loading = false;
      console.log(user);
      await this.mandarCorreo();
      await this.afAuth.auth.signOut();

    }).catch(error => {
      this.loading = false;
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: error.code,
        text: 'Por favor verifique',
      });
    });
  }

  mandarCorreo() {
    this.loading = true;
    return this.afAuth.auth.currentUser.sendEmailVerification().then
      ((user: any ) => {
        this.loading = false;
        this.logout();
        Swal.fire({
          icon: 'success',
          title: 'Le enviamos un correo de verificación..!',
          text: 'Por favor confirme..!',
        });
        this.router.navigateByUrl('/login');
      }).catch(error => {
        this.loading = false;
        this.logout();
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error de servicio',
          text: 'Intentelo mas tarde',
        });
      });
  }

  logout() {
    this.confirmarSalida();
    }

  confirmarSalida() {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Seguro desea cerrar sesión?..',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.value) {
        this.persona = [];
        this.afAuth.auth.signOut();
        localStorage.clear();
        this.router.navigateByUrl('/home');
        console.log('fuera');
      }
    });
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

  saveStorage(uid: string) {
    localStorage.setItem('user', JSON.stringify(uid));
  }
}
