export interface AuthContextType {
    user    : UserType;
    signin  : (user: string, pass: string) => Promise<UserType|IErrorLoginMessage>;
    signout : () => void;
}

export interface UserType {
    id                  : number,
    name                : string,
    login               : string,
    password?           : string,
    email               : string,
    tokenCreatedAt      : Date,
    tokenExpirationAt   : Date,
    token               : string
}

export interface IErrorLoginMessage {
    code: number,
    message?: string
}