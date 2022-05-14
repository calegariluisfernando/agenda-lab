import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight, faChevronCircleRight, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";

import Principal from "./pages/Principal/Principal";
import NivelPadraoDependente from "./pages/NivelPadraoDependente/NivelPadraoDependente";

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
    },
    {
        path: "/cadastro",
        name: "Cadastro",
        isPrivate: true,
        menuItem: {
            icon: <FontAwesomeIcon icon={faUser} className="me-2" />,
            classItem: 'text-white',
        },
        sub: [
            {
                path: "/nivel-acesso-padrao",
                name: "Nível de Acesso Padrão",
                element: <NivelPadraoDependente />,
                isPrivate: true,
                menuItem: {
                    icon: <FontAwesomeIcon icon={faChevronCircleRight} className="mx-2 sub-menu-color" />,
                    classItem: 'text-white',
                }
            },
            {
                path: "/nivel-acesso-padrao2",
                name: "Nível de Acesso Padrão2",
                element: <h1>nivel-acesso-padrao2</h1>,
                isPrivate: true,
                menuItem: {
                    icon: <FontAwesomeIcon icon={faAngleDoubleRight} className="me-2 ms-4 sub-menu-color" />,
                    classItem: 'text-white',
                }
            }
        ],
    }
] as Array<IRoute>;