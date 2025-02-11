export interface User {
  uid: string;
  email: string;
  fullName: string;
  totalAverageWeightRatings?: number;
  numberOfRents?: number;
  recentlyActive?: number;
  potentialScore?: number;
}
