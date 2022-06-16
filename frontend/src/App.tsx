import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { IRoute, routes } from "./routes";

import Layout from "./components/Layout/Layout";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import NoMatch from "./pages/NoMatch/NoMatch";
import Login from './pages/Login/Login';
import LoadingProvider from './contexts/Loading/LoadingContext';

export default function App(): JSX.Element {

    return (
        <BrowserRouter>
            <LoadingProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>

                        { getRoutes(routes) }

                    </Route>

                    <Route path='/login' element={<Login />} />
                    <Route path="*" element={<NoMatch />} />
                </Routes>
            </LoadingProvider>
        </BrowserRouter>
    );
}

const getRoutes = (values: IRoute[], basePath = "", key = 0): Array<JSX.Element> => {

    let elements = [] as Array<JSX.Element>;

    for (const value of values) {

        if (value?.sub?.length) {

            elements = elements.concat(getRoutes(value.sub, `${basePath}/${value.path}`, key));
        } else {

            const path = `${basePath}/${value.path}`.replace(/\/\//g, '/');

            elements.push(value.isPrivate
                ? <Route path={path} element={<PrivateRoute>{value.element as JSX.Element}</PrivateRoute>} key={++key} />
                : <Route path={path} element={value.element} key={++key} />
            );
        }
    }

    return elements;
}