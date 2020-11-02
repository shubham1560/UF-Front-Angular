import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTicketDetailsComponent } from './update-ticket-details.component';

describe('UpdateTicketDetailsComponent', () => {
  let component: UpdateTicketDetailsComponent;
  let fixture: ComponentFixture<UpdateTicketDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTicketDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
