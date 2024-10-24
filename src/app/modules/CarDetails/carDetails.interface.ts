export type TCarDetails = {
    driverEmail : string;
    driverName : string;
    carSerialNo : string;
    category : "car" | "truck" | "ambulance";
    verified : boolean;
    carImg : string ;
    carColor : string ;
}