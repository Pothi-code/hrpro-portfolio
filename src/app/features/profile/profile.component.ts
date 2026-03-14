import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from './services/profile.service';
import { ProfileField, ProfileSection } from './model/profile-field.model';
import { CommonModule } from '@angular/common';
import { DynamicFieldComponent } from './component/dynamic-field/dynamic-field.component';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,
    ReactiveFormsModule,
    CommonModule,
    DynamicFieldComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  form!: FormGroup;
  sections: ProfileSection[] = [];

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {

    this.profileService.getProfileFields().subscribe((res: ProfileSection[]) => {

      this.sections = res;

      this.createForm(res);

    });

  }

  createForm(sections: ProfileSection[]) {

    const group: any = {};

    sections.forEach((section: ProfileSection) => {

      section.fields.forEach((field: ProfileField) => {

        group[field.name] = [
          '',
          field.required ? Validators.required : []
        ];

      });

    });

    this.form = this.fb.group(group);

  }

}