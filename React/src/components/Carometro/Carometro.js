import React, { Component } from 'react';
import axios from 'axios';
import './Carometro.css';
//import Card from 'react-bootstrap/Card';
//import 'bootstrap'
import Main from '../template/Main';

const title = "Carômetro";

const urlAPI = "http://localhost:5255/api/aluno";
const urlAPICurso = "http://localhost:5255/api/curso";


const initialState = {
    aluno: { id: 0, ra: '', nome: '', codCurso: 0 },
    curso: { id: 0, codCurso: 0, nomeCurso: '', periodo: '' },
    lista: [],
    listaCurso: []
}

const imgUrl = 'https://avatars.githubusercontent.com/u/79612701?v=4';

export default class Carometro extends Component {

    state = {...initialState}

    componentDidMount() {
        axios(urlAPI)
        .then(result => {
            this.setState({lista: result.data})
        });
        axios(urlAPICurso).then(resp => {
            this.setState({ listaCurso: resp.data })
        })
    }

    renderForm(){
        <div>
            <select name="nomeCurso" id="codigoCurso">
                {this.state.listaCurso.map((curso) =>
                    <option key={curso.id} value={curso.codCurso}>{curso.nomeCurso}</option>
                )}
            </select>
        </div>
    }


    renderTable() {
        return (
            
            <div>
                {
                    this.state.lista.map((aluno) =>
                        <div className="card" key={aluno.id}>
                            <img src={`${imgUrl}/${aluno.ra}.png?raw=true`} alt={aluno.ra} />
                            <div className="container">
                                <h4><b>{aluno.ra}</b></h4>
                                <p>{aluno.nome}</p>
                            </div>
                        </div>
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