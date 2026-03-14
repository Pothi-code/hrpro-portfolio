import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProfileField, ProfileSection } from '../model/profile-field.model';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  constructor() { }
  getProfileFields(){
    return this.http.get<ProfileSection[]>(`${this.apiUrl}/sections`);
  }
}
