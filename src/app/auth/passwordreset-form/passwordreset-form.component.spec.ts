import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordresetFormComponent } from './passwordreset-form.component';

describe('PasswordresetFormComponent', () => {
  let component: PasswordresetFormComponent;
  let fixture: ComponentFixture<PasswordresetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordresetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordresetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
