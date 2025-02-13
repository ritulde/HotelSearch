import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HotelSearchComponent } from './hotel-search/hotel-search.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HotelSearchComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HotelSearchingAndAvailavility';
  isAvailableRoomPage: boolean = false;
  location: string = '';
  checkInDate: string = '';
  checkOutDate: string = '';
  rooms: number = 0;
  totalGuests: number = 0;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAvailableRoomPage = event.url.includes('/available-room');
      }
    });
  }

  updateSearchDetails(details: any) {
    this.location = details.location;
    this.checkInDate = this.formatDate(details.checkInDate);
    this.checkOutDate = this.formatDate(details.checkOutDate);
    this.rooms = details.rooms;
    this.totalGuests = details.totalGuests;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`;
  }

  goBackToSearch() {
    this.router.navigate(['/']);
  }
}
