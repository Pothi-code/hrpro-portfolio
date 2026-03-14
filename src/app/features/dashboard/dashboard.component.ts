import { Component,ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListItem,MatList } from '@angular/material/list';
import { combineLatest } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,MatCardModule,MatIcon,MatListItem,MatList,NgxSkeletonLoaderModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private dashboardService = inject(DashboardService);
  dashboardData$ = combineLatest({
  stats: this.dashboardService.getDashboardStats(),
  //leaveEmployees: this.dashboardService.getEmployeeOnLeave(),
  holidays: this.dashboardService.getHolidays()
});
 
  // leaveEmployees$ = this.dashboardService.getEmployeeOnLeave();
  // trackById(index:number,item:any){
  //   return item.id;
  // }
//   ngOnInit(){
    
//   dashboardData$ = combineLatest({
//     stats:this.dashboardService.getDashboardStats(),
//     holidays:this.dashboardService.getHolidays()

//   }
    
//   );

// }
}
