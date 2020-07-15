import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KbuseComponent } from './kbuse.component';

describe('KbuseComponent', () => {
  let component: KbuseComponent;
  let fixture: ComponentFixture<KbuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KbuseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KbuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
