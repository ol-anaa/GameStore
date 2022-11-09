import './Menu.css';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Menu(props) {
    return (
        <Navbar className='nav'>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className='menu'>
                        <Nav>
                            <Nav.Link href="/produtos" >Produtos</Nav.Link>
                            <Nav.Link href="/cadastro">Cadastre-se</Nav.Link>
                            <NavDropdown title="Usuário" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
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