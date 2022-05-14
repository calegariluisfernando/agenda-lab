import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import { ISidenav } from "../../Sidenav/ISidenav";
import "./TriggerSidenav.scss";

export default function TriggerSidenav({ isOpen, setIsOpen }: ISidenav) {

    return (
        <div className="trigger-sidenav-wrap">
            <button
                className="btn btn-default me-1 btn-trigger-sidenav"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FontAwesomeIcon icon={faBars} />
            </button>
        </div>
    );
}