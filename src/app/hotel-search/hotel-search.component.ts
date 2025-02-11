import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotel-search',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './hotel-search.component.html',
  styleUrl: './hotel-search.component.css'
})
export class HotelSearchComponent {

  city: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  rooms: number = 1;
  totalGuests: number = 1;
  roomDetails: { guests: number }[] = [{ guests: 1 }];

  hotelData: any;
  private apiUrl = 'https://b2cdev.frappe.cloud/api/method/at_utils.akbar_travels_utils.commonApi.hotel.get_hotel_info';

  constructor(private http: HttpClient) { }
  getHotelInfo() {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NWU1NjBjMmU2NTk5OTAxN2FjYTI0ODMiLCJ1bmlxdWVfbmFtZSI6I';

    const headers = new HttpHeaders({
      'Authorization': `${token}`,
      'Content-Type': 'application/json'
    });

    const requestBody = {
      "location": this.city,
      "checkin_date": this.checkInDate,
      "checkout_date": this.checkOutDate,
      "rooms": 1,
      "guests": 1
    };

    this.http.post(this.apiUrl, requestBody, { headers }).subscribe({
      next: (response) => {
        this.hotelData = response;
        console.log('API Response:', response);
      },
      error: (error) => {
        console.error('API Error:', error);
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
