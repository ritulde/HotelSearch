import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'available-room',
        loadComponent:()=>import('./hotel-availability/hotel-availability.component').then((c)=>c.HotelAvailabilityComponent)
    }
];
