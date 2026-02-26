import { Injectable, signal, computed, effect } from '@angular/core';
import { user } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private _user = signal<user | null>(this.loadUser());
  private _token = signal<string | null>(localStorage.getItem('token'));
  private _refreshToken = signal<string | null>(localStorage.getItem('refresh_token'));

  user = this._user.asReadonly();

  isLoggedIn = computed(() => !!this._user());
  token = computed(()=>this._token());
  refreshToken = computed(()=>this._refreshToken());
  role = computed(() => this._user()?.role ?? null);

  constructor() {
    effect(() => {
      const user = this._user();
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  private loadUser(): user | null {
    const stored = localStorage.getItem('user');

    if (!stored || stored === 'undefined') {
      return null;
    }

    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }

  login(user: user,token:string,refresh_token:string) {
    this._user.set(user);
    this._token.set(token);
    this._refreshToken.set(refresh_token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('refresh_token',refresh_token);
  }
  setTokens(access_token:string,refresh_token:string){
    this._token.set(access_token);
    this._refreshToken.set(refresh_token);
    localStorage.setItem('token',access_token);
    localStorage.setItem('refresh_token',refresh_token);
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._refreshToken.set(null);
    localStorage.clear();
  }
}