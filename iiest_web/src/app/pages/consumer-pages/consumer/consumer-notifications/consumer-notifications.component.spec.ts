import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerNotificationsComponent } from './consumer-notifications.component';

describe('ConsumerNotificationsComponent', () => {
  let component: ConsumerNotificationsComponent;
  let fixture: ComponentFixture<ConsumerNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumerNotificationsComponent]
    });
    fixture = TestBed.createComponent(ConsumerNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
