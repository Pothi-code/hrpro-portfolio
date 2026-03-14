import { Injectable,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { leaveType } from '../model/leave-type.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private _leaveTypes = signal<leaveType[]>([]);
  leaveTypes = this._leaveTypes.asReadonly();


  constructor() { }
  loadLeaveTypes(){
    this.http.get<leaveType[]>(`${this.apiUrl}/leaveTypes`).subscribe(res => this._leaveTypes.set(res));
  }
  
}
