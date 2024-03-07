import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyFactorValueComponent } from './monthly-factor-value.component';

describe('MonthlyFactorValueComponent', () => {
  let component: MonthlyFactorValueComponent;
  let fixture: ComponentFixture<MonthlyFactorValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyFactorValueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyFactorValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
