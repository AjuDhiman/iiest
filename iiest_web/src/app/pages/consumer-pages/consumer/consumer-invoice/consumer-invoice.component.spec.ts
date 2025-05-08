import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerInvoiceComponent } from './consumer-invoice.component';

describe('ConsumerInvoiceComponent', () => {
  let component: ConsumerInvoiceComponent;
  let fixture: ComponentFixture<ConsumerInvoiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumerInvoiceComponent]
    });
    fixture = TestBed.createComponent(ConsumerInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
