import { Component } from '@angular/core';
import { MatTableModule,MatColumnDef, MatHeaderCellDef, MatCellDef, MatHeaderRow, MatHeaderRowDef } from "@angular/material/table";
import { LeaveBalanceService } from '../../service/leave-balance.service';
import { HolidayService } from '../../service/holiday.service';
import { LeaveTypeService } from '../../service/leave-type.service';
import { inject } from '@angular/core';
import { LeaveService } from '../../service/leave.service';
@Component({
  selector: 'app-leave-balance',
  imports: [MatTableModule,MatColumnDef, MatHeaderCellDef, MatCellDef, MatHeaderRow, MatHeaderRowDef],
  templateUrl: './leave-balance.component.html',
  styleUrl: './leave-balance.component.scss'
})
export class LeaveBalanceComponent {
  leaveBalanceService = inject(LeaveBalanceService);
  leaveService = inject(LeaveService);
  holidayService = inject(HolidayService);
  leaveTypeService = inject(LeaveTypeService);
  displayedColumns = ['type','total','used','remaining'];
  leaveBalances = this.leaveBalanceService.leaveBalances;
 constructor(){
  this.leaveService.loadLeaves();
  this.holidayService.loadHolidays();
  this.leaveTypeService.loadLeaveTypes();
 this.leaveBalanceService.leaveBalances;
 }
}


