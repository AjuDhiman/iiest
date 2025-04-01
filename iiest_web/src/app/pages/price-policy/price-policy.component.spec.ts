import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricePolicyComponent } from './price-policy.component';

describe('PricePolicyComponent', () => {
  let component: PricePolicyComponent;
  let fixture: ComponentFixture<PricePolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PricePolicyComponent]
    });
    fixture = TestBed.createComponent(PricePolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
