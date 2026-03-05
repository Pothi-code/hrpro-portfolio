import { Component,OnInit, ViewChild ,ChangeDetectionStrategy,ChangeDetectorRef,signal,computed,effect} from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import { EmployeeService } from '../../../core/services/employee.service';
import { employee } from '../../../core/models/employee.model';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBar,MatSnackBarModule} from'@angular/material/snack-bar';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { FormBuilder,FormControl,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { debounceTime,distinctUntilChanged, Observable,merge } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import { startWith, switchMap,tap,map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { EmployeeStoreService } from '../state/employee-store.service';
import { inject } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';



@Component({
  selector: 'app-employee-list',
  imports: [ReactiveFormsModule, MatButtonModule, MatSnackBarModule, MatTableModule, RouterLink, CommonModule, MatProgressSpinnerModule, MatFormField, MatLabel, MatInput, MatPaginator],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent implements OnInit {
  public store = inject(EmployeeStoreService);
  loadingservice = inject(LoadingService);
  displayedColumns = ['id', 'name', 'email', 'role', 'department', 'actions'];
   employees = this.store.employees;
  totalRecords = this.store.totalRecords;
  loading = this.store.loading;
  searchForm = new FormGroup({
  search: new FormControl<string>('', { nonNullable: true })
});


  ngOnInit() {
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
ngAfterViewInit() {
  this.paginator.page.subscribe(event => {
    this.store.pageIndex.set(event.pageIndex);
    this.store.limit.set(event.pageSize);
    this.store.loadEmployees();
  });

  this.store.loadEmployees();
}

  delete(id: number) {
    this.store.deleteEmployee(id);
  }
 
}
