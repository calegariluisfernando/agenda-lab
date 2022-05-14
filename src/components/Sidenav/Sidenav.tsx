import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Nav, NavItem } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { IRoute, routes as allRoutes } from "./../../routes";
import { ISidenav } from "./ISidenav";
import TriggerSidenav from "../Header/ButtonTrigger/TriggerSidenav";

import "./Sidenav.scss";

export default function Sidenav({ isOpen, setIsOpen }: ISidenav): JSX.Element {

    return (

        <nav className={`sidenav${isOpen ? ' isOpen' : ''}`}>

            <OverlaySidenav isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="sidenav-content">
                <div className="sidenav-header">
                    <TriggerSidenav setIsOpen={setIsOpen} isOpen={isOpen} />
                </div>
                <div className="sidenav-body">
                    <SidenavWrapListItems isOpen={isOpen} setIsOpen={setIsOpen} />
                </div>
            </div>
        </nav>

    )
}

function OverlaySidenav({ isOpen, setIsOpen }: ISidenav): JSX.Element {

    return <div className="overlay-sidenav" onClick={() => setIsOpen(!isOpen)} />
}

function SidenavWrapListItems({ isOpen, setIsOpen }: ISidenav): JSX.Element {

    const links = createLinks({ routes: allRoutes, stateSidenav: { isOpen, setIsOpen }, basePath: "/" });
    return (
        <Nav vertical className="mt-2">
            {links}
        </Nav>
    )
}

function createLinks({ routes, stateSidenav, basePath, key }: { routes: IRoute[], stateSidenav: ISidenav, basePath: string, key?: number }) {

    const menuEstructure    = [];
    const regex             = /\/\//g;
    let idxElements         = key || 0;

    for (const route of routes) {

        let itemPath = `${basePath}/${route.path}`.replace(regex, '/');

        while (regex.test(itemPath)) {

            itemPath = itemPath.replace(regex, '/');
        }

        if (route?.sub?.length) {

            menuEstructure.push(
            
                menuCollapse({ 
                    route       : route, 
                    stateSidenav: stateSidenav, 
                    basePath    : `${itemPath}`, 
                    idxKey      : (++idxElements) * 1000 
                })

            );

        } else {

            menuEstructure.push(
                <NavItem key={++idxElements}>
                    <NavLink
                        to={itemPath}
                        key={++idxElements}
                        onClick={() => stateSidenav.setIsOpen(!stateSidenav.isOpen)}
                        className={route.menuItem.classItem}
                    >
                        <span className="d-inline-block text-truncate" style={{maxWidth: '275px'}}>
                            {route?.menuItem.icon}
                            {route.name}
                        </span>
                    </NavLink>
                </NavItem>
            );
        }
    }

    return menuEstructure;
}

function menuCollapse({ route, stateSidenav, basePath, idxKey }: { route: IRoute, stateSidenav: ISidenav, basePath: string, idxKey: number }) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <NavItem key={++idxKey} className="hass-children">

            <div 
                className={`d-flex align-items-center justify-content-between cursor-pointer ${ route.menuItem.classItem }`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <button 
                    type="button" 
                    className={`btn btn-link btn-sidenav p-0 ${ route.menuItem.classItem }`}
                    key={++idxKey}
                >
                    <span className="d-inline-block text-truncate" style={{maxWidth: '275px'}}>
                        {route.menuItem.icon}
                        {route.name}
                    </span>
                    
                </button>
                <FontAwesomeIcon icon={faCaretDown} />
            </div>

            <Collapse isOpen={isOpen} key={++idxKey}>
                <Nav vertical key={++idxKey}>
                    {
                        createLinks({ 
                            routes          : route.sub || [], 
                            stateSidenav    : stateSidenav, 
                            basePath        : route.sub?.length ? `${basePath}` : `${basePath}/${route.path}`, 
                            key             : ++idxKey 
                        })
                    }
                </Nav>
            </Collapse>

        </NavItem>
    )
}