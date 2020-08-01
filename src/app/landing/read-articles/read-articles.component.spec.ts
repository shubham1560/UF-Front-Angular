import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadArticlesComponent } from './read-articles.component';

describe('ReadArticlesComponent', () => {
  let component: ReadArticlesComponent;
  let fixture: ComponentFixture<ReadArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
