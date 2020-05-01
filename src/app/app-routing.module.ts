import { BuscadorPeliculasComponent } from './pages/buscador-peliculas/buscador-peliculas.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { ChatComponent } from './pages/chat/chat.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { ItemComponent } from './pages/item/item.component';
import { AboutComponent } from './pages/about/about.component';
import { PortafolioComponent } from './pages/portafolio/portafolio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';


const routes: Routes = [
  {path: 'home', component: PortafolioComponent},
  {path: 'about', component: AboutComponent},
  {path: 'item/:id', component: ItemComponent},
  {path: 'buscar/:termino', component: BuscadorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'contacto', component: ContactoComponent},
  {path: 'cine', component: PeliculasComponent},
  {path: 'buscador', component: BuscadorPeliculasComponent},
  {path: 'buscador/:buscar', component: BuscadorPeliculasComponent},
  {path: 'pelicula/:id/:pag', component: PeliculaComponent},
  {path: 'pelicula/:id/:pag/:busqueda', component: PeliculaComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
