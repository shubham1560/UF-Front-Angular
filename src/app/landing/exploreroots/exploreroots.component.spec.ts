import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerootsComponent } from './exploreroots.component';

describe('ExplorerootsComponent', () => {
  let component: ExplorerootsComponent;
  let fixture: ComponentFixture<ExplorerootsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorerootsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerootsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
