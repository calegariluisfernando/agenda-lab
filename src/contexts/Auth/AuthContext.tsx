import React, { createContext, ReactNode, useContext, useState } from "react";
import LocalDataClient from "../../services/LocalDataClient/LocalDataClient";
import HttpClient from "../../services/HttpClient/HttpClient";
import { AuthContextType, UserType, MessageType } from "./IAuth";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState(getUserLocal());

    const signin = async (login: string, pass: string): Promise<UserType|MessageType> => {

        return { code: 100 } as MessageType;
        let userLogin           = {} as UserType;
        const httpClient        = HttpClient.getInstance();
        const localDataClient   = LocalDataClient.getInstance();

        const params = { user: login, password: pass };
        const { statusCode, data } = await httpClient.post('/auth/login', JSON.stringify(params));

        let dataResponse = {} as { user: UserType };
        if (data) {

            dataResponse = JSON.parse(data);
        }

        if (statusCode >= 200 && statusCode <= 299) {

            userLogin = dataResponse.user;

            httpClient.setToken(userLogin.token);
            localDataClient.insert('user', JSON.stringify(userLogin));

            setUser(userLogin);
        } else {

            return { code: statusCode } as MessageType;
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

    return 'id' in obj && obj && 'firstName' in obj && 'lastName' in obj
        && 'email' in obj && 'login' in obj && 'tokenCreatedAt' in obj
        && 'tokenExpirationAt' in obj && 'token' in obj;
}