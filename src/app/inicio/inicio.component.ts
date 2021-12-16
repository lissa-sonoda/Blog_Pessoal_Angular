import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Post } from '../model/Post';
import { Topic } from '../model/Topic';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  postagem: Post = new Post();
  listPostagens: Post[];
  tituloPost: string;

  tema: Topic = new Topic();
  listTemas: Topic[];
  idTema: number;
  nomeTema: string;

  usuario: User = new User();
  idUsuario = environment.id;

  key = 'data';
  reverse = true;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou! Faça o login novamente.');
      this.router.navigate(['/entrar']);
    }

    this.getAllTemas();
    this.getAllPostagens();
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Topic[]) => {
      this.listTemas = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Topic) => {
      this.tema = resp;
    });
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Post[]) => {
      this.listPostagens = resp;
    });
  }

  findByIdUser() {
    this.authService.getByIdUser(this.idUsuario).subscribe((resp: User) => {
      this.usuario = resp;
    });
  }

  publicar() {
    this.tema.idtopic = this.idTema;
    this.postagem.topic = this.tema;

    this.usuario.iduser = this.idUsuario;
    this.postagem.username = this.usuario;

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Post) => {
      this.postagem = resp;
      this.alertas.showAlertSuccess('Postagem criada com sucesso!');
      this.postagem = new Post();
      this.getAllPostagens();
    });
  }

  findByTituloPostagem() {
    if (this.tituloPost == '') {
      this.getAllPostagens();
    } else {
      this.postagemService
        .getByTituloPostagem(this.tituloPost)
        .subscribe((resp: Post[]) => {
          this.listPostagens = resp;
        });
    }
  }

  findByNomeTema() {
    if (this.nomeTema == '') {
      this.getAllTemas();
    } else {
      this.temaService
        .getByNomeTema(this.nomeTema)
        .subscribe((resp: Topic[]) => {
          this.listTemas = resp;
        });
    }
  }
}
