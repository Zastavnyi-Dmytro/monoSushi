import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileChangePasswordComponent } from './user-profile-change-password.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

xdescribe('UserProfileChangePasswordComponent', () => {
  let component: UserProfileChangePasswordComponent;
  let fixture: ComponentFixture<UserProfileChangePasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileChangePasswordComponent],
      imports:[
        RouterLink
      ],
      providers:[
        {provide:Router, useValue:{}},
        {provide:ActivatedRoute, useValue:{}},
      ]
    });
    fixture = TestBed.createComponent(UserProfileChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
