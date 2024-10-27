import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskRewardComponent } from './risk-reward.component';

describe('RiskRewardComponent', () => {
  let component: RiskRewardComponent;
  let fixture: ComponentFixture<RiskRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskRewardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiskRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
