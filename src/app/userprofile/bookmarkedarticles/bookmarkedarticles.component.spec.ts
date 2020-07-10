import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkedarticlesComponent } from './bookmarkedarticles.component';

describe('BookmarkedarticlesComponent', () => {
  let component: BookmarkedarticlesComponent;
  let fixture: ComponentFixture<BookmarkedarticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkedarticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkedarticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
