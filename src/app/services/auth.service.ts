import { Usuario } from './../models/usuarios.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
apiKey = 'AIzaSyA9ceMo04OQxb9tHKH16VNKhwpKHgyVOmg';

  constructor( private http: HttpClient) { }


logout() {

}

login(usuario: Usuario) {
  const user = {
    email: usuario.correo,
    password: usuario.password,
    returnSecureToken: true
  };

  return this.http.post(`${this.url}signInWithPassword?key=${this.apiKey}`, user);
}

register(usuario: Usuario) {

const user = {
  email: usuario.correo,
  password: usuario.password,
  returnSecureToken: true
};

const headers = { headers: new HttpHeaders({ 'Content-type': 'application/json' })};
return this.http.post(`${this.url}signUp?key=${this.apiKey}`, user, headers);

}

}
