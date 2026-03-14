import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveLeaveDialogComponent } from './approve-leave-dialog.component';

describe('ApproveLeaveDialogComponent', () => {
  let component: ApproveLeaveDialogComponent;
  let fixture: ComponentFixture<ApproveLeaveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveLeaveDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveLeaveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
