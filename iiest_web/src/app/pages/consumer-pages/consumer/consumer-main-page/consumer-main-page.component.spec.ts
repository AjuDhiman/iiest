import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerMainPageComponent } from './consumer-main-page.component';

describe('ConsumerMainPageComponent', () => {
  let component: ConsumerMainPageComponent;
  let fixture: ComponentFixture<ConsumerMainPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumerMainPageComponent]
    });
    fixture = TestBed.createComponent(ConsumerMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
