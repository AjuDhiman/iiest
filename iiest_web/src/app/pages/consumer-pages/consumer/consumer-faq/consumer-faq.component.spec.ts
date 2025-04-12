import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerFaqComponent } from './consumer-faq.component';

describe('ConsumerFaqComponent', () => {
  let component: ConsumerFaqComponent;
  let fixture: ComponentFixture<ConsumerFaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumerFaqComponent]
    });
    fixture = TestBed.createComponent(ConsumerFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
