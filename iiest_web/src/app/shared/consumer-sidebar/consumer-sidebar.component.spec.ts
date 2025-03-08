import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerSidebarComponent } from './consumer-sidebar.component';

describe('ConsumerSidebarComponent', () => {
  let component: ConsumerSidebarComponent;
  let fixture: ComponentFixture<ConsumerSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumerSidebarComponent]
    });
    fixture = TestBed.createComponent(ConsumerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
