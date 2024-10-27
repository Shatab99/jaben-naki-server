export type TStartRide ={
    driverName : string;
    driverEmail : string;
    passengerBooked : string[];
    totalFare : number;
    from : string;
    to : string;
    journeyDate : string;
    type : "ride"| "parcel";
}