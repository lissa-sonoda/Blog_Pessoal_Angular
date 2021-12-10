import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from 'src/app/model/Topic';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css'],
})
export class TemaDeleteComponent implements OnInit {
  tema: Topic = new Topic();
  idTema: number;

  constructor(
    private temaService: TemaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      alert('Sua sessão expirou! Faça o login novamente.');
      this.router.navigate(['/entrar']);
    }

    this.idTema = this.route.snapshot.params['id'];
    this.findByIdTema(this.idTema);
  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Topic) => {
      this.tema = resp;
    });
  }

  apagar() {
    this.temaService.deleteTema(this.idTema).subscribe(() => {
      alert('Tema excluído com sucesso!');
      this.router.navigate(['/tema']);
    });
  }
}
