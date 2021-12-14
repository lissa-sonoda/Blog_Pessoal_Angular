import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/Post';
import { Topic } from 'src/app/model/Topic';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css'],
})
export class PostagemEditComponent implements OnInit {
  postagem: Post = new Post();

  tema: Topic = new Topic();
  listaTemas: Topic[];
  idTema: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou! Faça o login novamente.');
      this.router.navigate(['/entrar']);
    }

    let id = this.route.snapshot.params['id'];
    this.findByIdPostagem(id);
    this.findAllTemas();
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Post) => {
      this.postagem = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Topic) => {
      this.tema = resp;
    });
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Topic[]) => {
      this.listaTemas = resp;
    });
  }

  atualizar() {
    this.tema.idtopic = this.idTema;
    this.postagem.topic = this.tema;

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Post) => {
      this.postagem = resp;
      this.alertas.showAlertSuccess('Postagem atualizada com sucesso!');
      this.router.navigate(['/inicio']);
    });
  }
}
