import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsingTheEditorComponent } from './using-the-editor.component';

describe('UsingTheEditorComponent', () => {
  let component: UsingTheEditorComponent;
  let fixture: ComponentFixture<UsingTheEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsingTheEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsingTheEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
