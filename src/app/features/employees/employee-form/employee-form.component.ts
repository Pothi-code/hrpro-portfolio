import { Component, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { Validators, ɵInternalFormsSharedModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { FormBuilder,ReactiveFormsModule,Validator,FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { EmployeeService } from '../../../core/services/employee.service';
import { employee } from '../../../core/models/employee.model';
import {MatSelectModule} from '@angular/material/select';
import { MatInput, MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-employees',
  imports: [MatFormField, MatLabel, ɵInternalFormsSharedModule, MatButton,ReactiveFormsModule,MatSelectModule,MatInput],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeesFormComponent implements OnInit{
  empForm!:FormGroup;
  isEditMode=false;
  employeeId!:number;
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private router:Router,private employeeService:EmployeeService){

  }
  ngOnInit():void{
    this.empForm=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      role:['',Validators.required],
      department:['',Validators.required]
  });
  this.employeeId=Number(this.route.snapshot.paramMap.get('id'));
  if(this.employeeId){
    this.isEditMode=true;
    this.employeeService.getEmployee(this.employeeId).subscribe(emp=>{
      this.empForm.patchValue(emp);

    });
    

  }

  }
  create(){
      if(this.empForm.invalid)return;
      const employee:employee=this.empForm.value;
      if(this.isEditMode){
        this.employeeService.updateEmployee(this.employeeId,employee).subscribe(()=>this.router.navigate(['/employees']));
      }
      else{
        this.employeeService.createEmployee(employee).subscribe(()=>this.router.navigate(['/employees']));
      }
    }
  


}
