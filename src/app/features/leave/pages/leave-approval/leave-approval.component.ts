import { Component, computed } from '@angular/core';
import { MatHeaderCellDef, MatCellDef } from "@angular/material/table";
import { CommonModule } from '@angular/common';
import { LeaveService } from '../../service/leave.service';
import { inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-leave-approval',
  imports: [CommonModule,MatTableModule,MatButtonModule,MatChipsModule],
  templateUrl: './leave-approval.component.html',
  styleUrl: './leave-approval.component.scss'
})
export class LeaveApprovalComponent {
  private leaveService = inject(LeaveService);
  private snackBar = inject(MatSnackBar);
   displayedColumns = ['employeeId', 'employeeName', 'startDate', 'endDate','status', 'actions'];
  leaves = computed(()=>this.leaveService.leaves().filter(l=>l.status=='pending-manager'));
   ngOnInit() {
    this.leaveService.loadLeaves();
  }

  approve(id:number){
    this.leaveService.updateLeave(id,'approved');
    this.snackBar.open('Leave Approved','close',{duration:2000});

  }
  reject(id:number){
    this.leaveService.updateLeave(id,'rejected');
    this.snackBar.open('Rejected','close',{duration:2000});

  }

}
