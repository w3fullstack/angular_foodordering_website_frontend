import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCagetoryModalComponent } from './add-cagetory-modal.component';

describe('AddCagetoryModalComponent', () => {
  let component: AddCagetoryModalComponent;
  let fixture: ComponentFixture<AddCagetoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCagetoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCagetoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
