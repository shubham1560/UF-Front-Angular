import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectQuesPathComponent } from './select-ques-path.component';

describe('SelectQuesPathComponent', () => {
  let component: SelectQuesPathComponent;
  let fixture: ComponentFixture<SelectQuesPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectQuesPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectQuesPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
