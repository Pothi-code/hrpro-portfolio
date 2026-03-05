import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { employee } from '../models/employee.model';
import { PaginatedResponse } from '../models/paginated-response.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = environment.apiUrl;
  

  constructor(private http:HttpClient) { }
  getEmployees(page: number, limit: number,search:string=''){
    // let params = new HttpParams()
    //   .set('page', page)
    //   .set('limit', limit);
    // return this.http.get<PaginatedResponse<employee>>(`${this.apiUrl}/employees`,{params})
    return this.http.get<any[]>(
    `${this.apiUrl}/employees/?_page=${page}&_limit=${limit}&q=${search}`,  //we use db.json here as a backend
    { observe: 'response' }  
  );
  }

  getEmployee(employeeId:number){
    return this.http.get<employee>(`${this.apiUrl}/employee/${employeeId}`)

  }
  updateEmployee(id:number,employee:employee){
    return this.http.put<employee>(`${this.apiUrl}/employees/${id}`,employee)

  }
  createEmployee(employee:employee){
    return this.http.post<employee>(`${this.apiUrl}/employees`,employee)

  }
  deleteEmployee(id:number){
    
    return this.http.delete(`${this.apiUrl}/employees/${id}`)
  }
}
