import { Injectable,signal,computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private activatedRoutes = signal<number>(0);
  isLoading = computed(()=>this.activatedRoutes()>0);

  constructor() { }
  show(){
    this.activatedRoutes.update(count=>count+1);
  }
  hide(){
    this.activatedRoutes.update(count=>Math.max(0,count-1));

  }
}
