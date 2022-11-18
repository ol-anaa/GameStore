import React, { Component } from 'react';

import axios from 'axios';
import './AlterarProd.css';
import Main from '../template/Main';

const title = "Alteração de produtos";


const urlAPI = "http://localhost:5255/api/produto";
const initialState = {
    produto: { id: 0, valor: 0, nome: '', descricao: '' },
    lista: [],
}

const user = JSON.parse(localStorage.getItem("user"));


export default class AlterarProd extends Component {

    state = { ...initialState }

    componentDidMount() {

        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        });

        axios(urlAPI, { headers: { Authorization: 'Bearer ' + user.token } })
            .then(resp => {
                this.setState({ lista: resp.data });
            },
                (error) => {
                    const _mens =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    this.setState({ mens: _mens });
                }
            );

    }


    limpar() {
        this.setState({ produto: initialState.produto });
    } 

    salvar() {
       // let codigoCurso = document.getElementById('codigoCurso').value;
      
        const produto = this.state.produto;
        const metodo = produto.id ? 'put' : 'post';
        const url = produto.id ? `${urlAPI}/${produto.id}` : urlAPI;
        axios[metodo](url, produto)
        
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ produto: initialState.produto, lista })
            })
    }
    
    getListaAtualizada(produto, add = true) {
        const lista = this.state.lista.filter(a => a.id !== produto.id);
        if (add) lista.unshift(produto);
        return lista;
    }

    atualizaCampo(event) {
        const produto = { ...this.state.produto };
        produto[event.target.name] = event.target.value;
        this.setState({ produto });
    }

    carregar(produto) {
        this.setState({ produto })
    }

    remover(produto) {
        const url = urlAPI + "/" + produto.id;
        if (window.confirm("Confirma remoção do produto: " + produto.id)) {
            console.log("entrou no confirm");
            axios['delete'](url, produto)
                .then(resp => {
                    const lista = this.getListaAtualizada(produto, false)
                    this.setState({ produto: initialState.produto, lista })
                })
        }
    }

    renderForm() {
        return (
            <div className="inclui-container">
                <label> Nome: </label>
                <input
                    type="text"
                    id="nome"
                    placeholder="nome do produto"
                    className="form-input"
                    name="nome"

                    value={this.state.produto.nome}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Valor: </label>
                <input
                    type="text"
                    id="valor"
                    placeholder="Valor do produto"
                    className="form-input"
                    name="valor"

                    value={this.state.produto.valor}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Descição: </label>
                <input
                    type="text"
                    id="descricao"
                    placeholder="descricao do produto"
                    className="form-input"
                    name="valor"

                    value={this.state.produto.descricao}

                    onChange={e => this.atualizaCampo(e)}
                />

                <button className="btnSalvar"
                    onClick={e => this.salvar(e)} >
                    Salvar
                </button>
                <button className="btnCancelar"
                    onClick={e => this.limpar(e)} >
                    Cancelar
                </button>
            </div>
        )
    }

    renderTable() {
        return (
            <div className="listagem">
                <table className="listaProdutos" id="tblListaProdutos">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloValor">Valor</th>
                            <th className="tabTituloDescicao">Descrição</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lista.map(
                            (produto) =>

                                <tr key={produto.id}>
                                    <td>{produto.nome}</td>
                                    <td>{produto.valor}</td>
                                    <td>{produto.descricao}</td>
                                    <td>
                                        <button onClick={() => this.carregar(produto)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(produto)} >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
    render() {
        return (
            <Main className='main' title={title}>

                   
                   {this.renderForm()}
                   {this.renderTable()}
                  

            </Main>
        )
    }

}