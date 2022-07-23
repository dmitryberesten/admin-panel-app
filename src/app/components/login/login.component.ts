import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // '!' - обозначает, что проинициализирую значение поже

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  // передача данных в сервис
  submitLogin() {
    this.authService.login(this.loginForm.value).subscribe({

      // в случаи успеха перенаправь меня в компонент admin
      next: () => this.router.navigate(['admin']), 
      // в случаи не успеха покажи alert
      error: (err) => alert(err.message)
    });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({

      // добавил готовый валидатор от Ангуляр для email
      'email': new FormControl('', [Validators.required, Validators.email]),

      // Добавил собственный валидатор, регулярка
      'password': new FormControl('',
        [
          Validators.required,

          // В регулярке экранизировал символы "\"
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')
        ])
    });
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['admin'])
    }
  }

}
