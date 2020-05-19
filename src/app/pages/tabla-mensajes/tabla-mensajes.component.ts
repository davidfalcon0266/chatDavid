import { ContactoService } from './../../services/contacto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-tabla-mensajes',
  templateUrl: './tabla-mensajes.component.html',
  styleUrls: ['./tabla-mensajes.component.css']
})
export class TablaMensajesComponent implements OnInit {

  loading: boolean;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSource = new MatTableDataSource();
  displayedColumns = ['nombre', 'correo', 'mensaje'];
  selection = new SelectionModel(true);

  constructor(private ContacServi: ContactoService,
              ) { this.loading = true; }

  ngOnInit() {
    this.mostrarMsj();
  }
  public mostrarMsj(): void {
    this.ContacServi.cargarMensajes().subscribe(
      response => {
        this.loading = false;
        this.dataSource.paginator = this.paginator;
        this.dataSource.data = response === null ? [] : response;
      },
      err => {
        this.loading = false;
        console.log('error', err);
        });
  }

}
