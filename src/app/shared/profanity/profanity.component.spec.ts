import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfanityComponent } from './profanity.component';

describe('ProfanityComponent', () => {
  let component: ProfanityComponent;
  let fixture: ComponentFixture<ProfanityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfanityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfanityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
