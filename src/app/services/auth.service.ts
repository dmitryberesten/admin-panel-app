import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, Observable, of, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  // Такая себе фейк-авторизация через localStorage.
  // setToken получит какой-то токен и запишет его в localStorage.
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Получение токена
  getToken() {
    return localStorage.getItem('token');
  }

  // Залогинен ли пользователь. 
  // getToken вернет getItem, если нет то null
  isLoggedIn() {
    return this.getToken() !== null; 
  }

  login(userInfo: {email: string, password: string}): Observable<string | boolean> {
    
    // Проверка авторизации
    if (userInfo.email === 'admin@gmail.com' && userInfo.password === 'admin123'){
      this.setToken('alksflkgsklgjslkjffksdgjnsadgskmg')
      return of(true)
    }
    return throwError(() => new Error('Failed Login'))
  }

  logout(){
    this.router.navigate(['login'])
  }
}

