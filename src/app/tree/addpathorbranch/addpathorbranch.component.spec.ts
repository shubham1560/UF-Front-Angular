import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpathorbranchComponent } from './addpathorbranch.component';

describe('AddpathorbranchComponent', () => {
  let component: AddpathorbranchComponent;
  let fixture: ComponentFixture<AddpathorbranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpathorbranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpathorbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
