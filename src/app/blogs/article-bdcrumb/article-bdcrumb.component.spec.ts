import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleBdcrumbComponent } from './article-bdcrumb.component';

describe('ArticleBdcrumbComponent', () => {
  let component: ArticleBdcrumbComponent;
  let fixture: ComponentFixture<ArticleBdcrumbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleBdcrumbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleBdcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
