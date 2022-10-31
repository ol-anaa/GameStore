import React, { Component } from 'react';
import axios from 'axios';
import './Produtos.css';
import Main from '../template/Main';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

//Import das imagens 
import img from '../../assets/ListaJogos/Mario.jpg';

const title = "Lista de Produtos";

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

    renderCard() {
        return (

            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" class="Img" src={img} />
                <Card.Body>
                    <Card.Title><h3>Super Mario</h3></Card.Title>
                    <Card.Text>
                        Descrição do produto
                    </Card.Text>
                    <div>
                        <Button variant="secondary">Compre agora!</Button>
                    </div>
                </Card.Body>
            </Card>
        )
    }

    render() {
        return (
            <Main title={title}>
                {this.renderCard()}
            </Main>
        )
    }
}
