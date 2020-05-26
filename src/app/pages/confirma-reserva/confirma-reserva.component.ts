import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirma-reserva',
  templateUrl: './confirma-reserva.component.html',
  styleUrls: ['./confirma-reserva.component.css']
})
export class ConfirmaReservaComponent implements OnInit {
  reserva: any;

  constructor( public dialogRef: MatDialogRef<ConfirmaReservaComponent>,
               public router: Router) { }

  ngOnInit() {
  }

  onOkClick(): void {
    Swal.fire({
      title: 'En hora buena',
      text: 'Se ha reservado tu hora con éxito',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok'
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/cine');
        this.dialogRef.close();
      }
    });
  }

}
