import React, { createContext, ReactNode, useContext, useState } from "react";
import LocalDataClient from "../../services/LocalDataClient/LocalDataClient";
import HttpClient from "../../services/HttpClient/HttpClient";
import { AuthContextType, IErrorLoginMessage, UserType } from "./IAuth";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState(getUserLocal());

    const signin = async (login: string, pass: string): Promise<UserType|IErrorLoginMessage> => {

        let userLogin           = {} as UserType;
        const httpClient        = HttpClient.getInstance();
        const localDataClient   = LocalDataClient.getInstance();

        const params = { login: login, password: pass };
        const { code, data } = await httpClient.post('/users/auth/login', JSON.stringify(params));

        if (code >= 200 && code < 300) {

            userLogin = data.user;
            userLogin.token = data.token;
            userLogin.tokenCreatedAt = data.tokenCreatedAt;
            userLogin.tokenExpirationAt = data.tokenExpirationAt;

            httpClient.setToken(userLogin.token);
            localDataClient.insert('user', JSON.stringify(userLogin));

            setUser(userLogin);
        } else {

            return { code, message: data.message } as IErrorLoginMessage;
        }

        return userLogin;
    };

    const signout = (): void => {

        const localService = LocalDataClient.getInstance();
        localService.delete('user');
        setUser({} as UserType);
    };

    const value = { user, signin, signout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {

    return useContext(AuthContext);
}

function getUserLocal(): UserType {

    const localService = LocalDataClient.getInstance();
    const localUser = localService.get('user');
    let user = {} as UserType;

    if (localUser) {

        user = JSON.parse(localUser) as UserType;
    }

    if (!localUser || !isAnUserType(user)) {

        user = {} as UserType;
    }

    return user;
}

function isAnUserType(obj: UserType): boolean {

    return 'id' in obj && obj && 'name' in obj && 'email' in obj 
        && 'login' in obj && 'tokenCreatedAt' in obj
        && 'tokenExpirationAt' in obj && 'token' in obj;
}