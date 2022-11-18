import React, { useEffect, useState } from 'react';
import './Menu.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AuthService from '../../Services/AuthService';


export default function Menu(props) {

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);


    return (
        <Navbar className='nav'>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className='menu'>
                        <Nav>
                            <Nav.Link href="/produtos" >Produtos</Nav.Link>
                            <NavDropdown title="Usuário" id="basic-nav-dropdown">
                            {currentUser ? (
                                <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                                ) : (
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                )}
                                <NavDropdown.Item href="/carrinho">Carrinho</NavDropdown.Item>
                                <NavDropdown.Item href="/alterar">Alterar dados</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <Nav className='prop'>Funções proprietário</Nav>
                                <NavDropdown.Item href="/alterProd">Alterar produtos</NavDropdown.Item>

                            </NavDropdown>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}