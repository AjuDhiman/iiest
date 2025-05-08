import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerSettingsComponent } from './consumer-settings.component';

describe('ConsumerSettingsComponent', () => {
  let component: ConsumerSettingsComponent;
  let fixture: ComponentFixture<ConsumerSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumerSettingsComponent]
    });
    fixture = TestBed.createComponent(ConsumerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
