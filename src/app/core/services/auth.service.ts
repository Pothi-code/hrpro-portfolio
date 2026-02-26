import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  login(email:string,password:string){
    return this.http.get<user[]>(`http://localhost:3000/users?email=${email}&password=${password}`);
  }
}
