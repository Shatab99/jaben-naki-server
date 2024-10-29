export type TPassengerRideHistory = {
    driverName : string;
    passengerEmail : string;
    driverEmail : string;
    from : string;
    to : string;
    type : "ride" | "parcel";
    fare : number;
    numberOfSeats : number;
    reachedTime : string;
}