import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalOfficerComponent } from './local-officer.component';

describe('LocalOfficerComponent', () => {
  let component: LocalOfficerComponent;
  let fixture: ComponentFixture<LocalOfficerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalOfficerComponent]
    });
    fixture = TestBed.createComponent(LocalOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
