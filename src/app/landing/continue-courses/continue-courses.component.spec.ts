import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueCoursesComponent } from './continue-courses.component';

describe('ContinueCoursesComponent', () => {
  let component: ContinueCoursesComponent;
  let fixture: ComponentFixture<ContinueCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinueCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
