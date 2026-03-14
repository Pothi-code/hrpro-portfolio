import { Component,Input } from '@angular/core';
import { ProfileField } from '../../model/profile-field.model';
import { FormGroup, ReactiveFormsModule,Validators} from '@angular/forms';
import { MatLabel } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect,MatOption } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-field',
  imports: [MatLabel,CommonModule, MatFormField, MatInput, ReactiveFormsModule,MatSelect,MatOption],
  templateUrl: './dynamic-field.component.html',
  styleUrl: './dynamic-field.component.scss'
})
export class DynamicFieldComponent {
  @Input() field!:ProfileField;
  @Input() form!:FormGroup;

}
