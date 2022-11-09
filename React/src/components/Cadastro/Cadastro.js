import React, { Component } from 'react';
import axios from 'axios';
import './Cadastro.css';
import Main from '../template/Main';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../../assets/SemFundo.png';


const title = "Cadastro";

const urlAPI = "http://localhost:5255/api/aluno";
const urlAPICurso = "http://localhost:5255/api/curso";

const initialState = {
    aluno: { id: 0, ra: '', nome: '', codCurso: 0 },
    curso: { id: 0, codCurso: 0, nomeCurso: '', periodo: '' },
    lista: [],
    listaCurso: []
}


export default class Produtos extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI)
            .then(result => {
                this.setState({ lista: result.data })
            });
        axios(urlAPICurso).then(resp => {
            this.setState({ listaCurso: resp.data })
        })
    }

    renderForm() {
        return (
            <div className='Centro'>
            <img className='img' src={ logo } alt="Logo" />
            <Form >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Text>Nome</Form.Text>
              <Form.Control type="string" placeholder="Nome" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Text>Email</Form.Text>
              <Form.Control type="email" placeholder="email@example.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Text>Senha</Form.Text>
              <Form.Control type="password" placeholder="Senha" />
            </Form.Group>
            <Button  className='btn' variant="secondary" type="submit">Cadastrar</Button>
          </Form>
          </div>
        )
    }

    render() {
        return (
            <Main className='main' title={title}>
                {this.renderForm()}
            </Main>
        )
    }
}