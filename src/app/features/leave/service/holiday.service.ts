import { Injectable,signal } from '@angular/core';
import { holiday } from '../model/holiday.model';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HolidayService {
  private _holiday = signal<holiday[]>([]);
  holidays = this._holiday.asReadonly();
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() { }
  loadHolidays(){
    this.http.get<holiday[]>(`${this.apiUrl}/holidays`).subscribe(res=>this._holiday.set(res));
  }

}
