
export type TPassengerBooked = {
    email: string;
    totalFare: number;
    numberOfSeats: number;
}

export type TStartRide ={
    driverName : string;
    driverEmail : string;
    passengerBooked : TPassengerBooked[];
    totalFare : number;
    from : string;
    to : string;
    journeyDate : string;
    type : "ride"| "parcel";
}