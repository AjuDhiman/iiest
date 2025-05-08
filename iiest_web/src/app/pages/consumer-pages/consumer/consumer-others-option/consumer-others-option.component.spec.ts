import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerOthersOptionComponent } from './consumer-others-option.component';

describe('ConsumerOthersOptionComponent', () => {
  let component: ConsumerOthersOptionComponent;
  let fixture: ComponentFixture<ConsumerOthersOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsumerOthersOptionComponent]
    });
    fixture = TestBed.createComponent(ConsumerOthersOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
