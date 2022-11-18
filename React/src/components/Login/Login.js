import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import Main from '../template/Main';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../../assets/SemFundo.png';

import { useNavigate } from "react-router";
import AuthService from '../../Services/AuthService';

const title = "Login";

export default function Login() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(evento) {

        evento.preventDefault();
        const userForm = { email, password };
        
        if (!email || !password) {
            setMessage("Preencha o email e a senha para continuar!");
        } else {
            AuthService.login(email, password).then(
                () => {
                    console.log("localStorage: " +

                        localStorage.getItem("user"));
                    navigate("/");
                    window.location.reload(); // atualiza o localStorage
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);
                }
            );
        }
    };


    return (
        <div className='Centro'>
            <img className='img' src={logo} alt="Logo" />
            <Form onSubmit={handleSubmit} className="formLogin">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Text>Endereço de email</Form.Text>
                    <Form.Control type="email" 
                                  placeholder="Digite o email"
                                  className="inputAuth" 
                                  value={email}
                                  onChange={({ target }) => { setEmail(target.value);
                                    setMessage(""); }} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Text>Senha</Form.Text>
                    <Form.Control type="password" 
                                  value={password}
                                  placeholder="Senha"
                                  className="inputAuth"
                                  onChange={({ target }) => { setPassword(target.value);
                                  setMessage(""); }} />
                </Form.Group>
                <Button className='btn' variant="secondary" type="submit">
                    Entrar
                </Button>
                <h4 className="msgErro">{message}</h4>
            </Form>
        </div>
    )
}