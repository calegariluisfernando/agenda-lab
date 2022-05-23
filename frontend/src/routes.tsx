import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

import Principal from "./pages/Principal/Principal";
import Horarios from "./pages/Horarios/Horarios";
import Usuario from "./pages/Usuario/Usuario";

export interface IMenuItem {
    icon?       : JSX.Element,
    classItem?  : string
}

export interface IRoute {
    id?         : number,
    path        : string,
    name?       : string,
    isPrivate?  : boolean,
    element?    : JSX.Element,
    sub?        : Array<IRoute>,
    menuItem    : IMenuItem
}

export const routes = [
    {
        path: "/",
        name: "Principal",
        element: <Principal />,
        isPrivate: true,
        menuItem: {
            icon: <FontAwesomeIcon icon={faHouse} className="me-2" />,
            classItem: 'text-white',
        }
    }, {
        path: "/horarios",
        name: "Horarios",
        element: <Horarios />,
        isPrivate: true,
        menuItem: {
            icon: <FontAwesomeIcon icon={faClock} className="me-2" />,
            classItem: 'text-white',
        }
    }, {
        path: "/usuarios",
        name: "Usuarios",
        element: <Usuario />,
        isPrivate: true,
        menuItem: {
            icon: <FontAwesomeIcon icon={faUser} className="me-2" />,
            classItem: 'text-white',
        }
    }
] as Array<IRoute>;