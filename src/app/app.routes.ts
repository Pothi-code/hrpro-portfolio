import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:'login',loadComponent:()=>import('./features/auth/login/login.component').then(m=>m.LoginComponent)},
    {path:'',loadComponent:()=>import('./layout/main-layout/main-layout.component').then(m=>m.MainLayoutComponent),
    children:[
        {path:'dashboard',loadComponent:()=>import('./features/dashboard/dashboard.component').then(m=>m.DashboardComponent)},
        {path:'employees',loadComponent:()=>import('./features/employees/employees.component').then(m=>m.EmployeesComponent)},
        {path:'',loadComponent:()=>import('./features/leave/leave.component').then(m=>m.LeaveComponent)},
        {path:'',loadComponent:()=>import('./features/profile/profile.component').then(m=>m.ProfileComponent)}

    ]
},
];
