import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  element: any;
  loading: boolean;
  mensaje: any = '';
  constructor(public servi: ChatService,
              public router: Router) {
    this.loading = true;
    this.servi.cargarMensajes().subscribe(() => {
      this.loading = false;
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 40);
    }, error => {
      this.loading = false;
    });
  }

  ngOnInit() {
    this.element = document.getElementById('app-mensaje');
    setTimeout(() => {
      if (!this.servi.userLogg) {
        this.mostrarMessage();
        return;
      }
    }, 2000);
  }

  postMensaje() {
    if (this.mensaje.length === 0) {
      console.log('debes escribir un mensaje');
      return;
    }

    this.servi.GuardarMensajes(this.mensaje);
    this.mensaje = '';
  }

  mostrarMessage() {
    Swal.fire({
      icon: 'error',
      title: 'Debes iniciar sesión para poder chat..',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
    }).then((result) => {
      this.router.navigateByUrl('/login');
    });
  }


}
