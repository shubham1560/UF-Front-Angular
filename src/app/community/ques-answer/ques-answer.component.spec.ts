import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuesAnswerComponent } from './ques-answer.component';

describe('QuesAnswerComponent', () => {
  let component: QuesAnswerComponent;
  let fixture: ComponentFixture<QuesAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuesAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuesAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
