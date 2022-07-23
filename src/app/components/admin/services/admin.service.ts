import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {
  }

  // общий список
  getPersonalList(){
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users?_start=0&_limit=10');
  }

  // список конкретной персоны
  getPerson(id: number) {
    return this.http.get<User>(`https://jsonplaceholder.typicode.com/users/${id}`);
  }
}
