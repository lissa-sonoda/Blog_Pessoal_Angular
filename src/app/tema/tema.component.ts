import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Topic } from '../model/Topic';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css'],
})
export class TemaComponent implements OnInit {
  tema: Topic = new Topic();
  listTemas: Topic[];

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou! Faça o login novamente.');
      this.router.navigate(['/entrar']);
    }

    if (environment.type != 'adm') {
      this.alertas.showAlertInfo(
        'Você precisa ser administrador para acessar essa rota!'
      );
      this.router.navigate(['/inicio']);
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
      this.alertas.showAlertSuccess('Tema cadastrado com sucesso');
      this.findAllTemas();
      this.tema = new Topic();
    });
  }
}
