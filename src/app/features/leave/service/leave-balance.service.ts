import { Injectable,signal,computed } from '@angular/core';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { leaveBalance } from '../model/leave-balance.model';
import { inject } from '@angular/core';
import { LeaveService } from './leave.service';
import { LeaveTypeService } from './leave-type.service';
import { HolidayService } from './holiday.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveBalanceService {

  private authState = inject(AuthStateService);
  private leaveService = inject(LeaveService);
  private holidayService = inject(HolidayService);
  private leaveTypeService = inject(LeaveTypeService);

  leaveBalances = computed(() => {

    const user = this.authState.user();
    const leaves = this.leaveService.leaves();
    const holidays = this.holidayService.holidays();
    const leavePolicy = this.leaveTypeService.leaveTypes();

    if (!user) return [];

    return leavePolicy.map(policy => {

      const used = leaves
        .filter(l => l.employeeId === user.id && l.type === policy.name && l.status === 'approved')
        .reduce((total, leave) => {

          let start = new Date(leave.fromDate);
          let end = new Date(leave.toDate);

          let days = 0;

          while (start <= end) {

            const isHoliday = holidays.some(
              h => new Date(h.date).toDateString() === start.toDateString()
            );

            if (!isHoliday) {
              days++;
            }

            start.setDate(start.getDate() + 1);
          }

          return total + days;

        }, 0);

      return {
        type: policy.name,
        total: policy.totalPerYear,
        used: used,
        remaining: policy.totalPerYear - used
      }

    });

  });

}