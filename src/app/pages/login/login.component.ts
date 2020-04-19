import { ChatService } from './../../services/chat.service';
import { Usuario } from './../../models/usuarios.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formG: FormGroup;
  usuario: Usuario = new Usuario('', '', '');


  constructor(private formB: FormBuilder,
              private auth: AuthService,
              public servi: ChatService
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
    this.usuario.correo = this.formG.value.correo;
    this.usuario.password = this.formG.value.pws;
    this.servi.loginLocal(this.usuario);
  //   this.loading = true;
  //   this.loginUser.correo = this.formG.value.correo;
  //   this.loginUser.password = this.formG.value.pws;
  //   this.servi.loginUser(this.loginUser).subscribe((data: any) => {
  //     if (data.code === 0) {
  //       this.userStorage.correo = data.correo;
  //       this.userStorage.name = data.name;
  //       this.saveStorage();
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Bienvenido',
  //         text: data.message,
  //         timer: 2000,
  //         showClass: {
  //           popup: 'animated fadeInDown faster'
  //         },
  //         hideClass: {
  //           popup: 'animated fadeOutUp faster'
  //         }
  //       });
  //       location.href = 'http://localhost:4200/contacto';
  //     } else {
  //       this.loading = false;
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Oops...',
  //         text: data.message,
  //         showClass: {
  //           popup: 'animated fadeInDown faster'
  //         },
  //         hideClass: {
  //           popup: 'animated fadeOutUp faster'
  //         }

  //       });
  //     }
  //   }, error => {
  //     this.loading = false;
  //     console.log(error);
  //   });

  // }

  // saveStorage() {
  //   this.loading = false;
  //   localStorage.setItem('user', JSON.stringify(this.userStorage));
  }

  autentica(proveedor: string) {
    this.servi.login(proveedor);
  }
}

