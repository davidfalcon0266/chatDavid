import { Contacto } from './../../models/contacto';
import { ContactoService } from './../../services/contacto.service';
import { Router } from '@angular/router';
import { Usuario } from './../../models/usuarios.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  formG: FormGroup;
  usuario: Contacto = new Contacto('', '', '');
  loading = false;

  constructor(public formB: FormBuilder,
              public servi: ContactoService,
              public router: Router
             ) { }

  ngOnInit() {
    this.buildForm();
  }


  buildForm() {
    this.formG = this.formB.group({
      nombre: [null, Validators.required],
      correo: [null, Validators.required],
      mensaje: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  onSubmit() {
    this.loading = true;
    const mensaje: Contacto = {
    correo: this.formG.value.correo,
    mensaje: this.formG.value.mensaje,
    nombre: this.formG.value.nombre
    };
    this.servi.agregarMensajes(mensaje).then(() => {
        this.loading = false;
        this.messageSuccess();
        this.router.navigateByUrl('/cine');
        }).catch(error => {
      this.loading = false;
      this.messageError();
      return;
    });
  }

messageSuccess() {
  Swal.fire({
    icon: 'success',
    title: 'Mensaje enviado..!',
    text: 'Le contacteré los mas pronto posible..!',
  });
}

messageError() {
  Swal.fire({
    icon: 'error',
    title: 'Ocurrio un error inesperado..',
    text: 'Intentelo nuevamente..!',
  });
}

}
