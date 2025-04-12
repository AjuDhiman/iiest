import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertResourcesComponent } from './expert-resources.component';

describe('ExpertResourcesComponent', () => {
  let component: ExpertResourcesComponent;
  let fixture: ComponentFixture<ExpertResourcesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertResourcesComponent]
    });
    fixture = TestBed.createComponent(ExpertResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
