import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityLandingComponent } from './community-landing.component';

describe('CommunityLandingComponent', () => {
  let component: CommunityLandingComponent;
  let fixture: ComponentFixture<CommunityLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
