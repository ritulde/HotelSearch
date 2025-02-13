import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { CommonModule } from '@angular/common';
import { Hotel } from '../hotel.interface';

@Component({
  selector: 'app-hotel-availability',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-availability.component.html',
  styleUrls: ['./hotel-availability.component.css']
})
export class HotelAvailabilityComponent implements OnInit {

  hotelData: Hotel[] = [];
  paginatedHotels: Hotel[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 18;
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.hotelService.hotelData$.subscribe((data) => {
      this.hotelData = data;
      this.totalPages = Math.ceil(this.hotelData.length / this.itemsPerPage);
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.paginateHotels();
    });
  }

  paginateHotels(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedHotels = this.hotelData.slice(startIndex, endIndex);
  }

  changePage(page: number, event: Event): void {
    event.preventDefault();
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginateHotels();
    }
  }

  getRatingText(rating: number): string {
    if (rating >= 4.5) {
      return 'Excellent';
    } else if (rating >= 4) {
      return 'Very Good';
    } else if (rating >= 3) {
      return 'Good';
    } else if (rating >= 2) {
      return 'Average';
    } else {
      return 'Poor';
    }
  }
}
