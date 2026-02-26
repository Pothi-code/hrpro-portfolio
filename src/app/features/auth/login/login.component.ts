import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AuthStateService } from '../../../core/services/auth-state.service';
import {ReactiveFormsModule, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {OnInit} from '@angular/core';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatCardModule,MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  ngOnInit(){
    if(this.authState.isLoggedIn()){
      this.router.navigate(['/dashboard']);

    }
  }
  loginForm!:FormGroup;
  error='';

  constructor(private auth:AuthService, private fb:FormBuilder,private authState:AuthStateService, private router:Router){
    this.loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(6)]]
  });
    
  }
  onLogin(){
    if(this.loginForm.invalid)return;
    const{email,password}=this.loginForm.value;
    this.auth.login(email!,password!).pipe(take(1)).subscribe(users=>
    {
      if(users.length!=0)
      {
        const fakeToken = btoa('email'+':'+'Date.now()');
        const fakeRefreshToken = 'fake-refresh-token';
        this.authState.login(users[0],fakeToken,fakeRefreshToken);
        this.router.navigate(['/dashboard']);
      }
      else{
        this.error='Invalid Credentials';
      }
    }

    );
    

  }
  

}
