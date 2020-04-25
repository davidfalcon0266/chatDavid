import { InfoPaginaService } from './../../services/info-pagina.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  loading: boolean;
  equipos: [] = [];
  constructor(public infoService: InfoPaginaService) {
    this.loading = true;
    this.infoService.cargarEquipo().subscribe((data: []) => {
      this.loading = false;
      this.equipos = data;
    }, error => {
      this.loading = false;
      console.log(error);
    });
  }

  ngOnInit() {
  }

}
