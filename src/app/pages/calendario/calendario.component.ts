import { ConfirmaReservaComponent } from './../confirma-reserva/confirma-reserva.component';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  horaSeleccion = ['09: 00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00'];

  regiones: [] = [];
  todascomunas = [{
  metropolitana: [],
  valparaiso: []
  }];
  comunas: any[] = [];
  motivos = ['Ver proyecto', 'Apoyo Proyecto', 'Nuevo proyecto', 'Dar curso', 'Asesoria por hora', 'Otra'];
  minDate = new Date();
  maxDate = new Date();
  comenzar: boolean;
  formG: FormGroup;
  constructor(public formB: FormBuilder,
              public http: HttpClient,
              public dialog: MatDialog) {
    this.comenzar = false;
    this.maxDate.setDate(this.maxDate.getDate() + 15);
  }

  ngOnInit() {
    this.buildForm();
    this.getRegiones();
  }

  buildForm() {
    this.formG = this.formB.group({
      name: [null, Validators.required],
      telefono: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      region: [null, Validators.required],
      comuna: [null, Validators.required],
      direccion: [null, Validators.required],
      fecha: [null, Validators.required],
      hora: [null, Validators.required],
      motivo: [null, Validators.required],
    });
  }

  fechaa() {
    console.log(this.formG.value);
  }

  getRegiones() {
    this.http.get('assets/data/direccion.json').subscribe((data: any) => {
      console.log(data);
      this.todascomunas = data[0].comunas;
      this.regiones = data[0].regiones;
      console.log(this.todascomunas[0].metropolitana);

    });
  }

  onChange(region: any) {
   console.log(region);
   if (region === '1') {
   this.comunas = this.todascomunas[0].metropolitana;
   console.log('comuna 0', this.comunas);
  } else if (region === '2') {
    this.comunas = this.todascomunas[1].valparaiso;

  }
  }

  confirmarReserva() {

    const Dialog = this.dialog.open(ConfirmaReservaComponent, {
      height: 'auto',
      width: '350px',
    });
    console.log(this.formG.value);
    Dialog.componentInstance.reserva = this.formG.value;
   }
}
