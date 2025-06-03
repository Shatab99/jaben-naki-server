export type TPassengers ={
    email: string;
    totalFare: number;
    numberOfSeats: number;
}


export type TDriverRideHistory ={
    driverEmail : string;
    from : string;
    to : string;
    passengers : TPassengers[];
    type : "ride" | "parcel";
    totalFare : number;
    reachedTime : string;
}