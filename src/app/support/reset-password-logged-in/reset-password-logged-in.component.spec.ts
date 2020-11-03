import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordLoggedInComponent } from './reset-password-logged-in.component';

describe('ResetPasswordLoggedInComponent', () => {
  let component: ResetPasswordLoggedInComponent;
  let fixture: ComponentFixture<ResetPasswordLoggedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetPasswordLoggedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
