import { ChatService } from './../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MinLengthValidator } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {Usuario} from '../../../app/models/usuarios.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formG: FormGroup;
  public loading = false;
  public password = false;
  usuario: Usuario = new Usuario('', '', '');
  constructor(public formB: FormBuilder,
              public router: Router,
              public auth: AuthService,
              public authServi: ChatService
  ) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formG = this.formB.group({
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      correo: [null, Validators.required],
      pws: [null, [Validators.required, Validators.minLength(5)]],
      pws2: [null, [Validators.required, Validators.minLength(5)]],
      codigo: null
    });
  }

  registrar() {
   this.validarPassword();
   if (this.password) {
      return;
   }
   this.loading = true;
   this.usuario.correo = this.formG.value.correo;
   this.usuario.password = this.formG.value.pws;
   this.authServi.register(this.usuario.correo, this.usuario.password);
  }

   validarPassword() {
    this.password = false;
    const pws1 = this.formG.value.pws;
    const pws2 = this.formG.value.pws2;

    if (pws1 !== pws2) {
      Swal.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden',
        text: 'Intentalo de nuevo',
      });
      this.password = true;
      console.log('no consinciden');
    } else {
      this.password = false;
      console.log('son iguales');
    }
  }












  //   this.loading = true;
  //   const usuario = this.formG.value;
  //   this.codigo.getCodigo().subscribe((data: any) => {
  //     const ramdon = Math.floor(Math.random() * (30 - 1)) + 1;
  //     const validacion = data.valores;
  //     for (let i = 0; i < validacion.length; i++) {
  //       if (i === ramdon) {
  //         this.codigoValidacionUser = validacion[i];
  //       }
  //     }
  //     usuario.codigo = this.codigoValidacionUser;
  //     if (usuario.codigo !== null) {
  //       this.servi.contactoCliente(usuario).subscribe((datos: any) => {
  //         this.loading = false;
  //         if (datos.code === -1) {
  //           Swal.fire({
  //             position: 'center',
  //             icon: 'error',
  //             title: 'Usuario ya registrado en nuestra base de datos..',
  //             showConfirmButton: false,
  //             timer: 2000,
  //             showClass: {
  //               popup: 'animated fadeInDown faster'
  //             },
  //             hideClass: {
  //               popup: 'animated fadeOutUp faster'
  //             }
  //           });
  //           this.router.navigate(['/login']);
  //           return;
  //         }
  //         this.abrirModal();
  //       }, (error => {
  //         this.loading = false;
  //         console.log(error);
  //       }));
  //     }
  //   });
  // }

  // validarPassword() {
  //   this.password = false;
  //   const pws1 = this.formG.value.pws;
  //   const pws2 = this.formG.value.pws2;

  //   if (pws1 !== pws2) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Las contraseñas no coinciden',
  //       text: 'Intentalo de nuevo',
  //       showClass: {
  //         popup: 'animated fadeInDown faster'
  //       },
  //       hideClass: {
  //         popup: 'animated fadeOutUp faster'
  //       }
  //     });
  //     this.password = true;
  //     console.log('no consinciden');
  //   } else {
  //     this.password = false;
  //     console.log('son iguales');
  //   }
  // }

  // abrirModal() {
  //   const ipAPI = '//api.ipify.org?format=json';
  //   const inputValue = fetch(ipAPI)
  //     .then(response => response.json())
  //     .then(data => data.ip);

  //   Swal.fire({
  //     title: 'Te enviamos un codigo de verificacion al correo ' + this.formG.value.correo,
  //     text: 'Introduce tu codigo',
  //     input: 'text',
  //     inputValue: inputValue,
  //   }
  //   ).then((result) => {
  //     console.log(result);
  //     if (result.value === '') {
  //       console.log(result.value);
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Debe ingresar el codigo enviado..',
  //         confirmButtonColor: '#3085d6',
  //         confirmButtonText: 'Ok',
  //         showClass: {
  //           popup: 'animated fadeInDown faster'
  //         },
  //         hideClass: {
  //           popup: 'animated fadeOutUp faster'
  //         }
  //       }).then((result) => {
  //         this.abrirModal();
  //       });
  //     } else {

  //       if (result.value === this.codigoValidacionUser) {
  //         console.log('dice que es igual');
  //         this.saveUser().subscribe((data: Contacto) => {
  //           Swal.fire({
  //             position: 'center',
  //             icon: 'success',
  //             title: 'Bienvendo ' + data.name,
  //             showConfirmButton: false,
  //             timer: 1500,
  //             showClass: {
  //               popup: 'animated fadeInDown faster'
  //             },
  //             hideClass: {
  //               popup: 'animated fadeOutUp faster'
  //             }
  //           });
  //           this.router.navigateByUrl('/login');
  //           this.formG.reset();
  //         }, error => {
  //           console.log('error al guardar usuario', error);
  //           Swal.fire({
  //             position: 'center',
  //             icon: 'error',
  //             title: 'A ocurrido un error inesperado..!',
  //             showConfirmButton: false,
  //             timer: 1500,
  //             showClass: {
  //               popup: 'animated fadeInDown faster'
  //             },
  //             hideClass: {
  //               popup: 'animated fadeOutUp faster'
  //             }
  //           });
  //         });
  //         this.formG.reset();
  //       } else {
  //         Swal.fire({
  //           position: 'center',
  //           icon: 'error',
  //           title: 'El codigo no es correcto..Verificalo e intentalo nuevamente...',
  //           showCancelButton: true,
  //           confirmButtonColor: '#3085d6',
  //           cancelButtonColor: '#d33',
  //           confirmButtonText: 'Intentar de nuevo..!',
  //           showClass: {
  //             popup: 'animated fadeInDown faster'
  //           },
  //           hideClass: {
  //             popup: 'animated fadeOutUp faster'
  //           }
  //         }).then((result) => {
  //           if (result.value) {
  //             this.abrirModal();
  //           }
  //         });
  //       }
  //     }
  //   });
  // }


  // saveUser() {
  //   this.user.name = this.formG.value.name;
  //   this.user.correo = this.formG.value.correo;
  //   this.user.password = this.formG.value.pws;
  //   return this.servi.createUser(this.user);
  // }


}
