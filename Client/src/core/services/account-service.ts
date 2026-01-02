import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User, UserRegister } from '../../types/User';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private httpClient = inject(HttpClient);

  private baseUrl = 'https://localhost:5001/api/';
  public currentUser = signal<User | null>(null);

  login(model: any) {
    return this.httpClient.post<User>(this.baseUrl + 'account/login', model).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }

  register(model: UserRegister) {
    return this.httpClient.post<User>(this.baseUrl + 'account/register', model).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  private setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }
}
