import { Injectable,signal } from '@angular/core';
import { leave } from '../model/leave.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = environment.apiUrl;
  private _leaves = signal<leave[]>([]);
  leaves = this._leaves.asReadonly();
  constructor(private http:HttpClient) { }
  loadLeaves(){
    this.http.get<leave[]>(`${this.apiUrl}/leaveRequests`).subscribe(data=>{
      this._leaves.set(data);
    });
  }
  applyLeave(leave:leave){
    return this.http.post<leave>(`${this.apiUrl}/leaveRequests`,leave)
  }
  updateLeave(id:number,status:'approved'|'rejected'){
    this.http.patch(`${this.apiUrl}/leaveRequests/${id}`,{status}).subscribe(()=>{
      const updated = this._leaves().map(l=>l.id==id?{...l,status}:l);
      this._leaves.set(updated);
    });

  }
 
}
