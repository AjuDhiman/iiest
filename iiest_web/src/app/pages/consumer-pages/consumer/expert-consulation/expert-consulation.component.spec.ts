import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertConsulationComponent } from './expert-consulation.component';

describe('ExpertConsulationComponent', () => {
  let component: ExpertConsulationComponent;
  let fixture: ComponentFixture<ExpertConsulationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertConsulationComponent]
    });
    fixture = TestBed.createComponent(ExpertConsulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
