import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBoCustomerComponent } from './update-bo-customer.component';

describe('UpdateBoCustomerComponent', () => {
  let component: UpdateBoCustomerComponent;
  let fixture: ComponentFixture<UpdateBoCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateBoCustomerComponent]
    });
    fixture = TestBed.createComponent(UpdateBoCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
