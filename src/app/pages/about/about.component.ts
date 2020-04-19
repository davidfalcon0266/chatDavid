import { Equipo } from './../../interfaces/info-equipo';
import { InfoPaginaService } from './../../services/info-pagina.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  equipos: [] = [];
  constructor(public infoService: InfoPaginaService) {

    this.infoService.cargarEquipo().subscribe((data: []) => {
      this.equipos = data;
    });
  }

  ngOnInit() {
  }

}
