import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileHistoryComponent } from './user-profile-history.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('UserProfileHistoryComponent', () => {
  let component: UserProfileHistoryComponent;
  let fixture: ComponentFixture<UserProfileHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileHistoryComponent],
      schemas:[NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(UserProfileHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
