import { Component,signal,computed } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { inject } from '@angular/core';
import { HolidayService } from '../../service/holiday.service';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-holiday-calendar',
  imports: [MatCard,MatCardTitle,MatDatepickerModule, MatNativeDateModule,CommonModule],
  templateUrl: './holiday-calendar.component.html',
  styleUrl: './holiday-calendar.component.scss'
})
export class HolidayCalendarComponent {

  private holidayService = inject(HolidayService);

  holidays = this.holidayService.holidays; 

  ngOnInit(){
    this.holidayService.loadHolidays();
  }

 holidayMap = computed(() => {

    const map = new Map();

    this.holidays().forEach(h => {
      const date = new Date(h.date).setHours(0,0,0,0);
      map.set(date, h.name);
    });

    return map;

  });

  dateClass = (date: Date) => {

    const key = date.setHours(0,0,0,0);

    return this.holidayMap().has(key) ? 'holiday-date' : '';

  }
  getHolidayName(date: Date) {

  const key = new Date(date).setHours(0,0,0,0);

  return this.holidayMap().get(key);

}


}