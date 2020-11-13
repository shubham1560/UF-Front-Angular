import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseQuestionsComponent } from './browse-questions.component';

describe('BrowseQuestionsComponent', () => {
  let component: BrowseQuestionsComponent;
  let fixture: ComponentFixture<BrowseQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
