import { Component,signal,computed } from '@angular/core';
import { MatTableModule,MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCellDef, MatRowDef } from "@angular/material/table";
import { CommonModule } from '@angular/common';

import { LeaveService } from '../../service/leave.service';
import { leave } from '../../model/leave.model';
import { inject } from '@angular/core';
import { AuthStateService } from '../../../../core/services/auth-state.service';
@Component({
  selector: 'app-my-leave',
  imports: [CommonModule,MatTableModule,MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCellDef, MatRowDef],
  templateUrl: './my-leave.component.html',
  styleUrl: './my-leave.component.scss'
})
export class MyLeaveComponent {
  displayedColumns=['startDate','endDate','status'];
  private leaveService = inject(LeaveService);
  private authState = inject(AuthStateService);
  myLeaves = computed(()=>{
    const user = this.authState.user();
    return this.leaveService.leaves().filter(l=>l.employeeId=== user?.id)
  });
  ngOnInit(){
    this.leaveService.loadLeaves();
  }

}
