import './Logo.css';
import React from 'react';
import logo from '../../assets/AstroSFundo.png';

export default function Logo(props) {
    return (
        <aside className="logo">
            <a href="/" className="logo">
                <img src={ logo } alt="Logo" />
            </a>
        </aside>
    )
}