export type TStartRide ={
    driverName : string;
    driverEmail : string;
    bookingIds : string[];
    totalFare : number;
    from : string;
    to : string;
    journeyDate : string;
    type : "ride"| "parcel";
}