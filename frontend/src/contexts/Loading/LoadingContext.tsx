import React, { createContext, ReactNode, useContext, useState } from "react";
import Loading from "../../components/Loading/Loading";

interface LoadingType {
    isLoading   : boolean,
    toggle      : (flag: boolean) => void
}

const LoadingContext = createContext<LoadingType>({} as LoadingType);

export default function LoadingProvider({ children }: { children: ReactNode }) {

    const [isLoading, setIsLoading] = useState(false);

    const toggle = (flag: boolean): void => {

        setIsLoading(flag)
    }

    const value = { isLoading, toggle };

    return (
        <LoadingContext.Provider value={value}>
            { isLoading && <Loading /> }
            { children }
        </LoadingContext.Provider>
    );
}

export function useLoading() {

    return useContext(LoadingContext);
}