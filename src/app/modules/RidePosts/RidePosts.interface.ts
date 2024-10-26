export type TRidePosts ={
    driverEmail : string;
    driverName : string;
    from : string;
    to : string;
    fare : string;
    journeyStartTime : string;
    journeyDate : string;
    type : "ride"| "parcel";
    vacantSeats : number;
    pessengerBooked : string[];
}