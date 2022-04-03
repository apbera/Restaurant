import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservedDishesComponent } from './reserved-dishes.component';

describe('ReservedDishesComponent', () => {
  let component: ReservedDishesComponent;
  let fixture: ComponentFixture<ReservedDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservedDishesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservedDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
