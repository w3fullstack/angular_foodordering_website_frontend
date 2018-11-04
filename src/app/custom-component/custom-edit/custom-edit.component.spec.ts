import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomEditComponent } from './custom-edit.component';

describe('CustomEditComponent', () => {
  let component: CustomEditComponent;
  let fixture: ComponentFixture<CustomEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
