import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Contacto } from '../models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  public itemsCollection: AngularFirestoreCollection<Contacto>;

  constructor(public afs: AngularFirestore) {
    this.cargarMensajes();
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Contacto>(
      'mensajes');

    return this.itemsCollection.valueChanges();
  }

  agregarMensajes(mensaje: Contacto) {
    return this.itemsCollection.add(mensaje);
  }
}
