import React, { Component } from 'react';
import axios from 'axios';
import './Carrinho.css';
import Main from '../template/Main';

const title = "Carrinho";

const urlAPI = "http://localhost:5255/api/carrinho";
const initialState = {
    carrinho: { id_carrinho: 0, qtd: 0, id: 0},
    lista: []
}

export default class Carrinho extends Component {

    state = { ...initialState }
    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })
    }

    limpar() {
        this.setState({ carrinho: initialState.carrinho });
    }
    salvar() {
        const carrinho = this.state.carrinho;
        carrinho.carrinho = Number(carrinho.carrinho);
        const metodo = carrinho.id ? 'put' : 'post';
        const url = carrinho.id ? `${urlAPI}/${carrinho.id}` : urlAPI;
        axios[metodo](url, carrinho)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ carrinho: initialState.carrinho, lista })
            })
    }


    getListaAtualizada(carrinho, add = true) {
        const lista = this.state.lista.filter(a => a.id !== carrinho.id);
        if (add) lista.unshift(carrinho);
        return lista;
    }
    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const carrinho = { ...this.state.carrinho };
        //usar o atributo NAME do input para identificar o campo a ser atualizado
        carrinho[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ carrinho });
    }
    carregar(carrinho) {
        this.setState({ carrinho })
    }
    remover(carrinho) {
        const url = urlAPI + "/" + carrinho.id;
        if (window.confirm("Confirma remoção do carrinho: " + carrinho.id)) {
            console.log("entrou no confirm");
            axios['delete'](url, carrinho)
                .then(resp => {
                    const lista = this.getListaAtualizada(carrinho, false)
                    this.setState({ carrinho: initialState.carrinho, lista })
                })
        }
    }

    renderTable() {
        return (
            <div className="listagem">
                <table className="listaProd" id="tblListaProd">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTitulProd">Codigo do carrinho</th>
                            <th className="tabTituloVaor">Nome do carrinho</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lista.map(
                            (carrinho) =>

                                <tr key={carrinho.id}>
                                    <td>{carrinho.id_carrinho}</td>
                                    <td>{carrinho.qtd}</td>
                                    <td>
                                        <button onClick={() => this.carregar(carrinho)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(carrinho)} >
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
            <Main title={title}>
                <div className='main'>
                {this.renderTable()}
                </div>
            </Main>
        )
    }
}