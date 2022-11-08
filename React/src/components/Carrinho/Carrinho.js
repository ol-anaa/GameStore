import React, { Component } from 'react';
import axios from 'axios';
import './Carrinho.css';
import Main from '../template/Main';

const title = "Carrinho";

const urlAPI = "http://localhost:5255/api/curso";
const initialState = {
    curso: { id: 0, codCurso: 0, nomeCurso: '', periodo: '' },
    lista: []
}

export default class CrudCurso extends Component {

    state = { ...initialState }
    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        })
    }

    limpar() {
        this.setState({ curso: initialState.curso });
    }
    salvar() {
        const curso = this.state.curso;
        curso.codCurso = Number(curso.codCurso);
        const metodo = curso.id ? 'put' : 'post';
        const url = curso.id ? `${urlAPI}/${curso.id}` : urlAPI;
        axios[metodo](url, curso)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ curso: initialState.curso, lista })
            })
    }


    getListaAtualizada(curso, add = true) {
        const lista = this.state.lista.filter(a => a.id !== curso.id);
        if (add) lista.unshift(curso);
        return lista;
    }
    atualizaCampo(event) {
        //clonar usuário a partir do state, para não alterar o state diretamente
        const curso = { ...this.state.curso };
        //usar o atributo NAME do input para identificar o campo a ser atualizado
        curso[event.target.name] = event.target.value;
        //atualizar o state
        this.setState({ curso });
    }
    carregar(curso) {
        this.setState({ curso })
    }
    remover(curso) {
        const url = urlAPI + "/" + curso.id;
        if (window.confirm("Confirma remoção do curso: " + curso.id)) {
            console.log("entrou no confirm");
            axios['delete'](url, curso)
                .then(resp => {
                    const lista = this.getListaAtualizada(curso, false)
                    this.setState({ curso: initialState.curso, lista })
                })
        }
    }

    renderTable() {
        return (
            <div className="listagem">
                <table className="listaProd" id="tblListaProd">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTitulProd">Codigo do curso</th>
                            <th className="tabTituloVaor">Nome do Curso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lista.map(
                            (curso) =>

                                <tr key={curso.id}>
                                    <td>{curso.codCurso}</td>
                                    <td>{curso.nomeCurso}</td>
                                    <td>{curso.periodo}</td>
                                    <td>
                                        <button onClick={() => this.carregar(curso)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(curso)} >
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