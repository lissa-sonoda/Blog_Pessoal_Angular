import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Topic } from '../model/Topic';

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  /*getAllTema(): Observable<Topic[]> {
    return this.http.get<Topic[]>('http://localhost:8080/topics', this.token);
  }

  getByIdTema(id: number): Observable<Topic> {
    return this.http.get<Topic>(
      `http://localhost:8080/topics/${id}`,
      this.token
    );
  }

  postTema(tema: Topic): Observable<Topic> {
    return this.http.post<Topic>(
      'http://localhost:8080/topics',
      tema,
      this.token
    );
  }

  putTema(tema: Topic): Observable<Topic> {
    return this.http.put<Topic>(
      'http://localhost:8080/topics',
      tema,
      this.token
    );
  }

  deleteTema(id: number) {
    return this.http.delete(`http://localhost:8080/topics/${id}`, this.token);
  }*/

  getAllTema(): Observable<Topic[]> {
    return this.http.get<Topic[]>(
      'https://bloglissa.herokuapp.com/topics',
      this.token
    );
  }

  getByIdTema(id: number): Observable<Topic> {
    return this.http.get<Topic>(
      `https://bloglissa.herokuapp.com/topics/${id}`,
      this.token
    );
  }

  getByNomeTema(nome: string): Observable<Topic[]> {
    return this.http.get<Topic[]>(
      `https://bloglissa.herokuapp.com/topics/desc/${nome}`,
      this.token
    );
  }

  postTema(tema: Topic): Observable<Topic> {
    return this.http.post<Topic>(
      'https://bloglissa.herokuapp.com/topics',
      tema,
      this.token
    );
  }

  putTema(tema: Topic): Observable<Topic> {
    return this.http.put<Topic>(
      'https://bloglissa.herokuapp.com/topics',
      tema,
      this.token
    );
  }

  deleteTema(id: number) {
    return this.http.delete(
      `https://bloglissa.herokuapp.com/topics/${id}`,
      this.token
    );
  }
}
