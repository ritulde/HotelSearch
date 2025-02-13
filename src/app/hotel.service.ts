import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private hotelDataSource = new BehaviorSubject<any>(null);

  hotelData$ = this.hotelDataSource.asObservable();

  constructor() { }

  setHotelData(data: any) {
    this.hotelDataSource.next(data);
  }

  getHotelData() {
    return this.hotelDataSource.getValue();
  }
}
