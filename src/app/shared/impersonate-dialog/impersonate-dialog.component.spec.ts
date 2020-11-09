import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpersonateDialogComponent } from './impersonate-dialog.component';

describe('ImpersonateDialogComponent', () => {
  let component: ImpersonateDialogComponent;
  let fixture: ComponentFixture<ImpersonateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpersonateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpersonateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
