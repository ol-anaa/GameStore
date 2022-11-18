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
const urlAutoriza = "https://localhost:7065/api/Home/Adm";

const initialState = {
    produto: { id: 0, valor: 0.0, nome: '', descricao: '' },
    lista: [],
}



function getRandomIntInclusive(min, max, medin) {
    min = Math.ceil(min);
    max = Math.floor(max);
    medin = Math.floor(max);
    return Math.floor(Math.random() * (max + min + 1)) + min;
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
                            <Card.Img variant="top" className="ImgProd" src={`https://api.lorem.space/image/game?w=700&h=${getRandomIntInclusive(220 , 221, 224)}`} />
                            <Card.Body>
                                <Card.Title><h3>{produto.nome}</h3></Card.Title>
                                <Card.Text>
                                    {produto.descricao}
                                </Card.Text>
                                <div className='btnC'>
                                    <Button href="/carrinho" variant="secondary">Compre</Button>
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
