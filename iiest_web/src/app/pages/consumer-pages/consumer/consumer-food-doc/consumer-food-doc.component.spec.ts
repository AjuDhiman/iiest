import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerFoodDocComponent } from './consumer-food-doc.component';

describe('ConsumerFoodDocComponent', () => {
  let component: ConsumerFoodDocComponent;
  let fixture: ComponentFixture<ConsumerFoodDocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumerFoodDocComponent]
    });
    fixture = TestBed.createComponent(ConsumerFoodDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
