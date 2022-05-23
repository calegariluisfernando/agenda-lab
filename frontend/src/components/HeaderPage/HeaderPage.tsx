import React from 'react';
import './HeaderPage.scss'

export default function HeaderPage(props: { title: string, shortDescription: string }) {

    return (
        <section className='page-info'>
            <div className="page-title">
                <h1>{ props.title }</h1>
            </div>
            <div className="page-short-description">
                {props.shortDescription}
            </div>
        </section>
    );
}