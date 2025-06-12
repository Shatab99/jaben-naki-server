

export type TBookRide = {
    ridePostId : string;
    passengerEmail : string;
    driverEmail :string;
    passengerName :string;
    driverName : string
    from : string
    to : string
    journeyStartTime : string
    journeyDate : string
    fare : number
    numberOfSeats : number
    status : "notPicked" | "startedRide" | "reached"
    type : "ride" | "parcel"
    isPaid : boolean
    passengerPhone: string;
}