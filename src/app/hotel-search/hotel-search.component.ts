import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { HotelService } from '../hotel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-search',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterModule, RouterOutlet, CommonModule],
  templateUrl: './hotel-search.component.html',
  styleUrl: './hotel-search.component.css'
})
export class HotelSearchComponent implements OnInit {

  @Output() search = new EventEmitter<any>();

  city: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  rooms: number = 1;
  totalGuests: number = 1;
  roomDetails: { guests: number }[] = [{ guests: 1 }];
  today: string = '';
  minCheckOutDate: string = '';
  locationError: string = '';

  ngOnInit(): void {
    const todayDate = new Date();
    this.today = todayDate.toISOString().split('T')[0];
  }

  hotelData: any;
  private apiUrl = 'https://b2cdev.frappe.cloud/api/method/at_utils.akbar_travels_utils.commonApi.hotel.get_hotel_info';

  constructor(
      private http: HttpClient,
      private hotelService: HotelService,
      private router: Router
  ) { }

  formatDate(inputDate: string) {
    const date = new Date(inputDate); 
    const day = ('0' + date.getDate()).slice(-2); 
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  updateCheckOutMinDate() {
    if (this.checkInDate) {
      const checkIn = new Date(this.checkInDate);
      checkIn.setDate(checkIn.getDate() + 1);
      this.minCheckOutDate = checkIn.toISOString().split('T')[0];
      this.checkOutDate = '';
    }
  }

  validateLocation(): boolean {
    if (this.city.toLowerCase() === 'sin' || this.city.toLowerCase() === 'singapore') {
      this.locationError = '';
      return true;
    } else {
      this.locationError = 'Location must be "SIN" or "Singapore"';
      return false;
    }
  }

  searchHotels() {
    if (!this.validateLocation()) {
      return;
    }

    this.search.emit({
      location: this.city,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      rooms: this.rooms,
      totalGuests: this.totalGuests
    });

    this.getHotelInfo();
  }

  getHotelInfo() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWU1NjBjMmU2NTk5OTAxN2FjYTI0ODMiLCJ1bmlxdWVfbmFtZSI6I';

    const headers = new HttpHeaders({
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "location": this.city,
      "checkin_date": this.formatDate(this.checkInDate),
      "checkout_date": this.formatDate(this.checkOutDate),
      "rooms": this.rooms,
      "guests": this.totalGuests
    };

    this.http.post(this.apiUrl, requestBody, { headers }).subscribe({
      next: (response) => {
        this.hotelData = response;
        this.hotelService.setHotelData(this.hotelData?.message?.hotels);
        const dataInService = this.hotelService.getHotelData();
      if (dataInService && dataInService.length > 0) {
        this.router.navigate(['/available-room']); 
      }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  addRoom() {
    this.roomDetails.push({ guests: 1 });
  }

  increaseGuests(index: number) {
    this.roomDetails[index].guests++;
  }

  decreaseGuests(index: number) {
    if (this.roomDetails[index].guests > 1) {
      this.roomDetails[index].guests--;
    }
  }

  updateRoomGuestSelection() {
    this.rooms = this.roomDetails.length;
    this.totalGuests = this.roomDetails.reduce((sum, room) => sum + room.guests, 0);
  }
}
