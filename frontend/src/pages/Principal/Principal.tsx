import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';

export default function Principal(): JSX.Element {

    return (
        <main className="container-fluid page-content">
            <FullCalendar
                plugins={[dayGridPlugin]}
                locale={'pt-BR'}
                weekends={false}
            />
        </main>
    )
}