import { Injectable,signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  constructor() { }
  getDashboardStats():Observable<any>{
    return this.http.get(`${this.apiUrl}/dashboardstats`).pipe(shareReplay(1));
  }
  // getEmployeeOnLeave():Observable<any>{
  //   return this.http.get(`${this.apiUrl}/dashboard/leave-employees`).pipe(shareReplay(1));
  // }
  getHolidays():Observable<any>{
 return this.http.get(`${this.apiUrl}/holidays`).pipe(shareReplay(1));
}

}
