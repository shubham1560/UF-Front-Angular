import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPathComponent } from './assign-path.component';

describe('AssignPathComponent', () => {
  let component: AssignPathComponent;
  let fixture: ComponentFixture<AssignPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
