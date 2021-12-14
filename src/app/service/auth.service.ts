import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  /*entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(
      'http://localhost:8080/users/login',
      userLogin
    );
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:8080/users/signup', user);
  }

  atualizar(user: User): Observable<User> {
    return this.http.put<User>(
      'http://localhost:8080/users/update',
      user,
      this.token
    );
  }

  getByIdUser(id: number): Observable<User> {
    return this.http.get<User>(`http://localhost:8080/users/${id}`);
  }*/

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(
      'https://bloglissa.herokuapp.com/users/login',
      userLogin
    );
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>(
      'https://bloglissa.herokuapp.com/users/signup',
      user
    );
  }

  atualizar(user: User): Observable<User> {
    return this.http.put<User>(
      `https://bloglissa.herokuapp.com/users/update`,
      user,
      this.token
    );
  }

  getByIdUser(id: number): Observable<User> {
    return this.http.get<User>(`https://bloglissa.herokuapp.com/users/${id}`);
  }

  logado() {
    let ok: boolean = false;
    if (environment.token != '') {
      ok = true;
    }
    return ok;
  }

  adm() {
    let ok: boolean = false;
    if (environment.type == 'adm') {
      ok = true;
    }
    return ok;
  }
}
