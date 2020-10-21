import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathbuilderComponent } from './pathbuilder.component';

describe('PathbuilderComponent', () => {
  let component: PathbuilderComponent;
  let fixture: ComponentFixture<PathbuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathbuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
