import React from "react";

import TriggerSidenav from "./ButtonTrigger/TriggerSidenav";
import { ISidenav } from "../Sidenav/ISidenav";
import { useAuth } from "../../contexts/Auth/AuthContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

import "./Header.scss";

export default function Header({ isOpen, setIsOpen }: ISidenav) {
    return (
        <header className="header-page">
            <div className="header-actions">
                <TriggerSidenav isOpen={isOpen} setIsOpen={setIsOpen} />
                <HeaderInfo />
            </div>
        </header>
    );
}

import userImg from "../../images/header/user-icon.png";

function HeaderInfo() {

    const { user } = useAuth();

    return (
        <div className="header-info">
            <ul className="header-info-list">
                <li className="header-info-item">
                    <div className="media-avatar">
                        <img src={userImg} className="rounded-circle" />
                        <h6 className="m-0 text-white user-name">{[user.firstName, user.lastName].join(' ')}</h6>
                    </div>
                </li>
                <li className="header-info-item">
                    <button className="btn btn-light btn-signout">
                        <FontAwesomeIcon icon={faSignOut} className="me-2" />
                        Sair
                    </button>
                </li>
            </ul>
        </div>
    );
}