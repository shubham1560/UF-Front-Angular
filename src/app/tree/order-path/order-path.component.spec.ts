import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPathComponent } from './order-path.component';

describe('OrderPathComponent', () => {
  let component: OrderPathComponent;
  let fixture: ComponentFixture<OrderPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
