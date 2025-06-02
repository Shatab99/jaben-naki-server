import { Model } from "mongoose";

export interface TUser {
    email: string
    userName : string
    password : string
    role : "passenger" | "driver" | 'admin'
    status : "warned" | "blocked" | "good" | "pending"
    isRiding : boolean
    startRideId? : string
}

export interface User extends Model<TUser> { 
    isUserExists(email : string) : Promise<TUser>
    isPasswordCorrect(plain:string, hash :string) : Promise<boolean>; 
    isUserPending(email : string) : Promise<boolean>;
}