import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../model/Post';

@Injectable({
  providedIn: 'root',
})
export class PostagemService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  /*getAllPostagens(): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:8080/posts', this.token);
  }

  getByIdPostagem(id: number): Observable<Post> {
    return this.http.get<Post>(`http://localhost:8080/posts/${id}`, this.token);
  }

  postPostagem(postagem: Post): Observable<Post> {
    return this.http.post<Post>(
      'http://localhost:8080/posts',
      postagem,
      this.token
    );
  }

  putPostagem(postagem: Post): Observable<Post> {
    return this.http.put<Post>(
      'http://localhost:8080/posts',
      postagem,
      this.token
    );
  }

  deletePostagem(id: number) {
    return this.http.delete(`http://localhost:8080/posts/${id}`, this.token);
  }*/

  getAllPostagens(): Observable<Post[]> {
    return this.http.get<Post[]>(
      'https://bloglissa.herokuapp.com/posts',
      this.token
    );
  }

  getByIdPostagem(id: number): Observable<Post> {
    return this.http.get<Post>(
      `https://bloglissa.herokuapp.com/posts/${id}`,
      this.token
    );
  }

  getByTituloPostagem(titulo: string): Observable<Post[]> {
    return this.http.get<Post[]>(
      `https://bloglissa.herokuapp.com/posts/title/${titulo}`,
      this.token
    );
  }

  postPostagem(postagem: Post): Observable<Post> {
    return this.http.post<Post>(
      'https://bloglissa.herokuapp.com/posts',
      postagem,
      this.token
    );
  }

  putPostagem(postagem: Post): Observable<Post> {
    return this.http.put<Post>(
      'https://bloglissa.herokuapp.com/posts',
      postagem,
      this.token
    );
  }

  deletePostagem(id: number) {
    return this.http.delete(
      `https://bloglissa.herokuapp.com/posts/${id}`,
      this.token
    );
  }
}
