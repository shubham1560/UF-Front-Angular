import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeecommentsComponent } from './seecomments.component';

describe('SeecommentsComponent', () => {
  let component: SeecommentsComponent;
  let fixture: ComponentFixture<SeecommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeecommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeecommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
