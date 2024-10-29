export type TPassengers = {
    name : string ;
    email : string ;
} 



export type TDriverRideHistory ={
    driverEmail : string;
    from : string;
    to : string;
    passengers : TPassengers [];
    type : "ride" | "parcel";
    totalFare : number;
    reachedTime : string;
}