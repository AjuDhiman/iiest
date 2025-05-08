import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMailBoComponent } from './send-mail-bo.component';

describe('SendMailBoComponent', () => {
  let component: SendMailBoComponent;
  let fixture: ComponentFixture<SendMailBoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendMailBoComponent]
    });
    fixture = TestBed.createComponent(SendMailBoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
