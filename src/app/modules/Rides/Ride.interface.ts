export type TRide = {
    passengerEmail : string;
    driverEmail :string;
    passengerName :string;
    driverName : string
    from : string
    to : string
    fare : string
    status : "notPicked" | "startedRide" | "reached"
    type : "ride" | "parcel"
}