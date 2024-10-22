export const UserRole ={
    admin : "admin",
    passenger :"passenger",
    driver :'driver'
} as const;


export type TUserRole =keyof typeof UserRole;

