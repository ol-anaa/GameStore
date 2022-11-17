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

const urlAPI = "http://localhost:5255/api/produto";

const initialState = {
    produto: { id_produto: 0, valor: 0.0, nome: '', descricao: '' },
    lista: [],
}


export default class Produtos extends Component {

    state = { ...initialState }

    componentDidMount() {
        axios(urlAPI)
            .then(result => {
                this.setState({ lista: result.data })
            })
    }

    renderTable() {
        return (
            <div>
                {
                    this.state.lista.map((produto) =>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" class="Img" src={img} />
                            <Card.Body>
                                <Card.Title><h3>{produto.nome}</h3></Card.Title>
                                <Card.Text>
                                    {produto.descricao}
                                </Card.Text>
                                <div className='btnC'>
                                    <Button  variant="secondary">Compre</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )
                }
            </div>
        )
    }

    render() {
        return (
            <Main title={title}>
                {this.renderTable()}
            </Main>
        )
    }
}
