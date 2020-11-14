import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommNewQuestionComponent } from './comm-new-question.component';

describe('CommNewQuestionComponent', () => {
  let component: CommNewQuestionComponent;
  let fixture: ComponentFixture<CommNewQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommNewQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommNewQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
