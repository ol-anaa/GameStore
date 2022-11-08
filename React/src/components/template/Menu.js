import './Menu.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu(props) {
    return (
        <nav className='menu'>
            <Link to="/produtos">
                Produtos
            </Link>
            <Link to="/carrinho">
                Carrinho
            </Link>
            <Link to="/login">
                Login
            </Link>
        </nav>
    )
}