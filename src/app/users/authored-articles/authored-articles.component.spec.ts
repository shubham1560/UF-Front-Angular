import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthoredArticlesComponent } from './authored-articles.component';

describe('AuthoredArticlesComponent', () => {
  let component: AuthoredArticlesComponent;
  let fixture: ComponentFixture<AuthoredArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthoredArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthoredArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
