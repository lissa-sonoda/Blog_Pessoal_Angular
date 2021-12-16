import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css'],
})
export class EntrarComponent implements OnInit {
  userLogin: UserLogin = new UserLogin();

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  entrar() {
    this.auth.entrar(this.userLogin).subscribe(
      (resp: UserLogin) => {
        this.userLogin = resp;

        environment.token = this.userLogin.token;
        environment.name = this.userLogin.namelog;
        environment.picture = this.userLogin.picturelog;
        environment.id = this.userLogin.idlog;
        environment.type = this.userLogin.usertypelog;

        this.router.navigate(['/inicio']);
      },
      (error) => {
        if (error.status == 401) {
          this.alertas.showAlertDanger('Dados inválidos!');
        }
      }
    );
  }
}
