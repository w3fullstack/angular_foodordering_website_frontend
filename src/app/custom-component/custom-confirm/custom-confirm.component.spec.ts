import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomConfirmComponent } from './custom-confirm.component';

describe('CustomConfirmComponent', () => {
  let component: CustomConfirmComponent;
  let fixture: ComponentFixture<CustomConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
