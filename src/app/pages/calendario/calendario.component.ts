import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  horaSeleccion = ['09: 00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00'];

  regiones = [{
    value: '1',
    region: 'Metropolitana de Santiago'
  },
  {
    value: '2',
    region: 'Melipilla'
  },
 {
   value: '3',
   region: 'Maipo'
 }
 ];
 comunas = [{
   metropolitana: ['Santiago centro', 'Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central',
                   'Huechuraba', 'Independencia', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina',
                   'Las Condes', 'Lo Barnechea', ' Lo Espejo', ' Lo Prado', 'Macul', 'Maipú', ' Ñuñoa', 'Pedro Aguirre Cerda',
                   'Peñalolén', 'Providencia', 'Pudahuel', 'Quilicura', 'Quinta Normal', ' Recoleta', 'Renca', 'San Joaquín',
                   'San Miguel', 'San Ramón', 'Vitacura']
 },
{
  melipilla: ['Melipilla']
}];


  motivos = ['Ver proyecto', 'Apoyo Proyecto', 'Nuevo proyecto', 'Dar curso', 'Asesoria por hora', 'Otra'];
  minDate = new Date();
  maxDate = new Date();
  comenzar: boolean;
  formG: FormGroup;
  constructor(public formB: FormBuilder) {
    this.comenzar = false;
    this.maxDate.setDate(this.maxDate.getDate() + 15);
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.formG = this.formB.group({
      region: [null, Validators.required],
      fecha: [null, Validators.required],
      hora: [null, Validators.required],
      motivo: [null, Validators.required],
    });
  }

  fechaa() {
    console.log(this.formG.value);

  }

}
