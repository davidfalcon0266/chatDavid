import { ItemComponent } from './pages/item/item.component';
import { AboutComponent } from './pages/about/about.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {MatToolbarModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDialogModule,
  MatSelectModule, MatSidenavModule, MatListModule, MatPaginatorModule, MatTableModule, MatSnackBarModule,
  MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule
} from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';


import { MatIconModule } from '@angular/material/icon';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NgxLoadingModule } from 'ngx-loading';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { PortafolioComponent } from './pages/portafolio/portafolio.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ChatComponent } from './pages/chat/chat.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { PeliculasPipePipe } from './pipes/peliculas-pipe.pipe';
import { GaleriaComponent } from './pages/peliculas/galeria.component';
import { BuscadorPeliculasComponent } from './pages/buscador-peliculas/buscador-peliculas.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { ToolbarComponent } from './pages/toolbar/toolbar.component';
import { TablaMensajesComponent } from './pages/tabla-mensajes/tabla-mensajes.component';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { ConfirmaReservaComponent } from './pages/confirma-reserva/confirma-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PortafolioComponent,
    AboutComponent,
    ItemComponent,
    BuscadorComponent,
    RegisterComponent,
    LoginComponent,
    ChatComponent,
    ContactoComponent,
    PeliculasComponent,
    PeliculasPipePipe,
    GaleriaComponent,
    BuscadorPeliculasComponent,
    PeliculaComponent,
    ToolbarComponent,
    TablaMensajesComponent,
    CalendarioComponent,
    ConfirmaReservaComponent
  ],
  entryComponents: [ConfirmaReservaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    AngularFireModule,
    MatSidenavModule,
    CdkTableModule,
    MatSnackBarModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgxLoadingModule.forRoot({})
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
