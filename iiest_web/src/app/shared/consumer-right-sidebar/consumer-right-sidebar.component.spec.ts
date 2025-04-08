import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerRightSidebarComponent } from './consumer-right-sidebar.component';

describe('ConsumerRightSidebarComponent', () => {
  let component: ConsumerRightSidebarComponent;
  let fixture: ComponentFixture<ConsumerRightSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumerRightSidebarComponent]
    });
    fixture = TestBed.createComponent(ConsumerRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
