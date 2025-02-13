

interface Facility {
    id: number;
    groupId: number;
    name: string;
  }
  
  interface GeoCode {
    lat: number;
    long: number;
  }
  
  interface Rate {
    baseRate: string;
    commission: number;
    discounts: number;
    fees: number;
    pointEquivalent: number;
    provider: string;
    providerId: string;
    taxes: number;
    total: number;
  }
  
  interface UserReview {
    rating: number;
    count: number;
  }
  
  export interface Hotel {
    id: string;
    name: string;
    address: string;
    chainName: string;
    countryCode: string;
    distance: number;
    facilities: Facility[];
    freeBreakfast: any;
    freeCancellation: any;
    geoCode: GeoCode;
    heroImage: string;
    isRecommended: any;
    isRefundable: any;
    isSoldOut: boolean;
    locationName: any;
    moreRatesExpected: boolean;
    propertyType: string;
    provider: string;
    rate: Rate;
    relevanceScore: number;
    starRating: number;
    userReview: UserReview;
    images: any[];
    url: any;
  }
  