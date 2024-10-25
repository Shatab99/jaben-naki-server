export type TRide = {
    passengerEmail : string;
    driverEmail :string;
    passengerName :string;
    driverName : string
    from : string
    to : string
    journeyStartTime : string
    fare : number
    numberOfSeats : number
    status : "notPicked" | "startedRide" | "reached"
    type : "ride" | "parcel"
    isPaid : boolean
}