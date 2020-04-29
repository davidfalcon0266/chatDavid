import { async } from '@angular/core/testing';
import { ProductosService } from './../../services/productos.service';
import { Component, OnInit } from '@angular/core';
declare var particlesJS: any;

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {
  constructor(public productoServices: ProductosService) {
  }

  async  ngOnInit() {
    particlesJS.load('particles-js', 'particles.json', null);
  }

}
