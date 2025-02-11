import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAvailabilityComponent } from './hotel-availability.component';

describe('HotelAvailabilityComponent', () => {
  let component: HotelAvailabilityComponent;
  let fixture: ComponentFixture<HotelAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelAvailabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
