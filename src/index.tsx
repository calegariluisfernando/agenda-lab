import React from 'react';
import { createRoot } from 'react-dom/client';

import AuthProvider from "./contexts/Auth/AuthContext";
import App from "./App";

import 'bootstrap/scss/bootstrap.scss';
import './index.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);