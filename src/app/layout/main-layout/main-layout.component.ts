import { Component,computed, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { AuthStateService } from '../../core/services/auth-state.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {BreakpointObserver} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';



@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLinkWithHref,CommonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatToolbarModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
   @ViewChild(MatSidenav) sidenav!: MatSidenav;
 isMobile = false;
  constructor(public authstate:AuthStateService,private router:Router, private breakpointobserver:BreakpointObserver){
     this.breakpointobserver.observe(['(max-width: 768px)']).subscribe(result=>{
      this.isMobile=result.matches;
     });

  }



  role=computed(()=>this.authstate.role());
 
  logout(){
    this.authstate.logout();
    this.router.navigate(['/login']);
  }
  closeIfMobile(){
    if(this.isMobile){
      this.sidenav.close();

    }

  }


}
