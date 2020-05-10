import { Router } from '@angular/router';
import { ChatService } from './../../services/chat.service';
import { Usuario } from './../../models/usuarios.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formG: FormGroup;
  usuario: Usuario = new Usuario('', '', '');
  loading = false;

  constructor(public formB: FormBuilder,
              public auth: AuthService,
              public servi: ChatService,
              public router: Router
             ) { }

  ngOnInit() {
    this.buildForm();
  }


  buildForm() {
    this.formG = this.formB.group({
      correo: [null, Validators.required],
      pws: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    this.loading = true;
    this.usuario.correo = this.formG.value.correo;
    this.usuario.password = this.formG.value.pws;
    this.servi.login(this.usuario.correo, this.usuario.password).then((user: any) => {
        this.loading = false;
        if (!user.user.emailVerified
          ) {
            Swal.fire({
              icon: 'info',
              title: 'se le envio un link a ' + user.user.email,
              text: 'Por favor verifique',
            });
            return;
          }
        this.messageSuccess();
        this.router.navigateByUrl('/chat');
        this.servi.saveStorage(user.user.uid);
        }).catch(error => {
      this.loading = false;
      this.messageError();
      return;
    });
  }

  abrirModal() {
    const ipAPI = '//api.ipify.org?format=json';
    const inputValue = fetch(ipAPI)
      .then(response => response.json())
      .then(data => data.ip);

    Swal.fire({
      title: 'Introduce tu correo',
      input: 'text',
      inputValue: inputValue,
      showCancelButton: true,
    }
    ).then((result) => {
      if (result.value) {
        this.loading = true;
        this.servi.restablecerPassword(result.value).then((user: any) => {
          this.loading = false;
          Swal.fire({
            icon: 'success',
            title: 'Se a enviado un enlace para cambiar contraseña..',
            text: 'Por favor verifique',
          });
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
    });
  }

messageSuccess() {
  Swal.fire({
    icon: 'success',
    title: 'Bienvenido',
    text: 'Ahora podras unirte al chat..!',
    timer: 2000,
  });
}

messageError() {
  Swal.fire({
    icon: 'error',
    title: 'Usuario o contraseña incorrecta..!',
    text: 'Por favor verifique',
  });
}

}

