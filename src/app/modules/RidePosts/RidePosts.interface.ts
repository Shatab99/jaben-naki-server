export type TRidePosts = {
    driverEmail: string;
    driverName: string;
    from: string;
    pickUpPoint: string;
    to: string;
    fare: number;
    journeyStartTime: string;
    journeyDate: string;
    type: "ride" | "parcel";
    totalSeats: number;
    vacantSeats: number;
    bookingIds: string[];
    driverRating: number;
    driverPhone: string;
}