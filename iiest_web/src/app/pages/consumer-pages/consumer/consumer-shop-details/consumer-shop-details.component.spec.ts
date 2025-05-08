import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerShopDetailsComponent } from './consumer-shop-details.component';

describe('ConsumerShopDetailsComponent', () => {
  let component: ConsumerShopDetailsComponent;
  let fixture: ComponentFixture<ConsumerShopDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumerShopDetailsComponent]
    });
    fixture = TestBed.createComponent(ConsumerShopDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
