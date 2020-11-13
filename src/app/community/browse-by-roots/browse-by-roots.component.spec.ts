import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseByRootsComponent } from './browse-by-roots.component';

describe('BrowseByRootsComponent', () => {
  let component: BrowseByRootsComponent;
  let fixture: ComponentFixture<BrowseByRootsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseByRootsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseByRootsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
