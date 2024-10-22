export type TDriver = {
    Did: string;
    email: string;
    name: string;
    dateOfBirth: string;
    contactNumber: string;
    isVerified: boolean;
    kycVerified: boolean;
    role: 'driver';
    credit: number;
    rating: number;
    complitedRides: string[];
    CurstomerReview: {
        Cname: string,
        review: string
    }[];
    category: "car" | "truck";
    isActive: boolean;
    profileImg: string;
    rideHistory: string[];
}