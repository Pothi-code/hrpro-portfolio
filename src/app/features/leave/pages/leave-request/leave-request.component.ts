import { Component } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { ɵInternalFormsSharedModule, ReactiveFormsModule, FormGroup,FormBuilder,Validator, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LeaveService } from '../../service/leave.service';
import { AuthStateService } from '../../../../core/services/auth-state.service';


@Component({
  selector: 'app-leave-request',
  imports: [MatFormField, MatLabel, ɵInternalFormsSharedModule, MatButton, ReactiveFormsModule,MatFormFieldModule,MatInputModule],
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.scss'
})
export class LeaveRequestComponent {
  leaveForm!:FormGroup;
  constructor(private fb:FormBuilder,private leaveService:LeaveService,private authState:AuthStateService){
    this.leaveForm = this.fb.group(
      {
        fromDate:['',Validators.required],
        toDate:['',Validators.required],
        type:['',Validators.required],
        reason:['',Validators.required]
      }
    );
  }
  leaveSubmit(){
    if(this.leaveForm.invalid)return;
    const user = this.authState.user();
    if(!user)return;
    const leave = {
      employeeId:user.id,
      employeeName:user.name,
      ...this.leaveForm.value,
      status:'pending'
    };
    this.leaveService.applyLeave(leave).subscribe(() => {
    this.leaveForm.reset();
    });

  }

}
