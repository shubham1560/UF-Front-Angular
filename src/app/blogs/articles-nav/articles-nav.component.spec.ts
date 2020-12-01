import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesNavComponent } from './articles-nav.component';

describe('ArticlesNavComponent', () => {
  let component: ArticlesNavComponent;
  let fixture: ComponentFixture<ArticlesNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
