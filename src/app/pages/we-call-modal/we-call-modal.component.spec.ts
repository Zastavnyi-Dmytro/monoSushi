import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeCallModalComponent } from './we-call-modal.component';

describe('WeCallModalComponent', () => {
  let component: WeCallModalComponent;
  let fixture: ComponentFixture<WeCallModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeCallModalComponent]
    });
    fixture = TestBed.createComponent(WeCallModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
