import { Injectable,signal } from '@angular/core';
import { employee } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';
import { WebsocketService } from '../../../core/services/websocket.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeStoreService {
  //state
  employees = signal<employee[]>([]);
  loading = signal<boolean>(false);
  totalRecords = signal<number>(0);
  pageIndex = signal<number>(0);
  limit = signal<number>(5);
  search = signal<string>('');
  deletingIds = signal<number[]>([]);
  
  

  constructor(private employeeService:EmployeeService,private websocketService:WebsocketService) {
    this.listenToRealtime();
   }
   //load from backend
   loadEmployees(){
    this.loading.set(true);
    this.employeeService.getEmployees(this.pageIndex()+1,this.limit(),this.search()).subscribe({next:(res)=>{
      this.employees.set(res.body ?? []);
      const total = res.headers.get('X-Total-Count');
        this.totalRecords.set(total ? +total : 0);
        this.loading.set(false);
    }});
   }
   deleteEmployee(id:number){
    const previous = this.employees();
    this.employees.update(list=>list.filter(e=>e.id!==id));
    this.totalRecords.update(t=>t-1);
    this.employeeService.deleteEmployee(id).subscribe((error)=>{
      this.employees.set(previous);
      this.totalRecords.update(t=>t+1);

    });
   }
   private listenToRealtime() {
  this.websocketService.messages$
    .subscribe(event => {

      if (event.type === 'EMPLOYEE_CREATED') {
        this.totalRecords.update(t => t + 1);
      }

      if (event.type === 'EMPLOYEE_DELETED') {
        this.employees.update(list =>
          list.filter(e => e.id !== event.id)
        );
        this.totalRecords.update(t => t - 1);
      }

      if (event.type === 'EMPLOYEE_UPDATED') {
        this.employees.update(list =>
          list.map(emp =>
            emp.id === event.employee.id
              ? event.employee
              : emp
          )
        );
      }
    });
}

}
