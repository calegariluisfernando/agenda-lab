export interface AuthContextType {
    user    : UserType;
    signin  : (user: string, pass: string) => Promise<UserType|MessageType>;
    signout : () => void;
}

export interface UserType {
    id                  : number,
    firstName           : string,
    lastName            : string,
    codigoParceiro      : string,
    email               : string,
    login               : string,
    password?           : string,
    avatar?             : string,
    created?            : Date,
    tokenCreatedAt      : Date,
    tokenExpirationAt   : Date,
    token               : string
}

export interface MessageType {
    code    : number,
    message?: string
}