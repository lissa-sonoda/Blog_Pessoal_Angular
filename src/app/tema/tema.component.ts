import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Topic } from '../model/Topic';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css'],
})
export class TemaComponent implements OnInit {
  tema: Topic = new Topic();
  listTemas: Topic[];

  constructor(private router: Router, private temaService: TemaService) {}

  ngOnInit() {
    if (environment.token == '') {
      alert('Sua sessão expirou! Faça o login novamente.');
      this.router.navigate(['/entrar']);
    }

    this.findAllTemas();
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Topic[]) => {
      this.listTemas = resp;
    });
  }

  cadastrarTema() {
    this.temaService.postTema(this.tema).subscribe((resp: Topic) => {
      this.tema = resp;
      alert('Tema cadastrado com sucesso');
      this.findAllTemas();
      this.tema = new Topic();
    });
  }
}
