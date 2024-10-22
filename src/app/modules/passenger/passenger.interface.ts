export type TPassenger = {
    pid : string;
    email :string;
    name: string;
    dateOfBirth : Date ;
    contactNumber : string;
    isVerified : boolean;
    role : 'passenger';
    profileImg : string;
    rideHistory : string[];
}