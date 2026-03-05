import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
    {path:'login',loadComponent:()=>import('./features/auth/login/login.component').then(m=>m.LoginComponent)},
    {path:'',loadComponent:()=>import('./layout/main-layout/main-layout.component').then(m=>m.MainLayoutComponent),
    canActivate:[authGuard],
    children:[
        {path:'dashboard',loadComponent:()=>import('./features/dashboard/dashboard.component').then(m=>m.DashboardComponent)},
        {path:'employees',canActivate:[roleGuard],data:{role:'admin'},loadComponent:()=>import('./features/employees/employee-list/employee-list.component').then(m=>m.EmployeeListComponent)},
        {path:'employees/create',canActivate:[roleGuard],data:{role:'admin'},loadComponent:()=>import('./features/employees/employee-form/employee-form.component').then(m=>m.EmployeesFormComponent)},
        {path:'employees/edit/:id',canActivate:[roleGuard],data:{role:'admin'},loadComponent:()=>import('./features/employees/employee-form/employee-form.component').then(m=>m.EmployeesFormComponent)},
        {path:'leave',loadComponent:()=>import('./features/leave/leave.component').then(m=>m.LeaveComponent)},
        {path:'profile',loadComponent:()=>import('./features/profile/profile.component').then(m=>m.ProfileComponent)},
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

    ]
},
{ path: '**', redirectTo: 'login' }
];
