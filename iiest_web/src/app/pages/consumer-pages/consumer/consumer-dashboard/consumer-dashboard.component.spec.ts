import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerDashboardComponent } from './consumer-dashboard.component';

describe('ConsumerDashboardComponent', () => {
  let component: ConsumerDashboardComponent;
  let fixture: ComponentFixture<ConsumerDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumerDashboardComponent]
    });
    fixture = TestBed.createComponent(ConsumerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
