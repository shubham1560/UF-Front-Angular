import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatMattersComponent } from './what-matters.component';

describe('WhatMattersComponent', () => {
  let component: WhatMattersComponent;
  let fixture: ComponentFixture<WhatMattersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatMattersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatMattersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
