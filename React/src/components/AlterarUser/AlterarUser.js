import React, { Component } from 'react';
import axios from 'axios';
import './AlterarUser.css';
import Main from '../template/Main';

const title = "Alteração Usuários";

const urlAPI = "http://localhost:5255/api/aluno";

const initialState = {
    usuario: { id_usuario: 0, nome: '', email: '', senha: 0 },
    lista: [],
}

export default class AlterarUser extends Component {

    state = { ...initialState }
    
    componentDidMount() {
        axios(urlAPI).then(resp => {
            this.setState({ lista: resp.data })
        });

    }

    limpar() {
        this.setState({ usuario: initialState.usuario });
    } 

    salvar() {
        
        const usuario = this.state.usuario;
        usuario.nome = String(nome);
        const metodo = usuario.id ? 'put' : 'post';
        const url = usuario.id ? `${urlAPI}/${usuario.id}` : urlAPI;
        axios[metodo](url, usuario)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({ usuario: initialState.usuario, lista })
            })
    }

    
    getListaAtualizada(usuario, add = true) {
        const lista = this.state.lista.filter(a => a.id !== usuario.id);
        if (add) lista.unshift(usuario);
        return lista;
    }

    carregar(usuario) {
        this.setState({ usuario })
    }

    remover(usuario) {
        const url = urlAPI + "/" + usuario.id;
        if (window.confirm("Confirma remoção do usuario: " + usuario.id)) {
            console.log("entrou no confirm");
            axios['delete'](url, usuario)
                .then(resp => {
                    const lista = this.getListaAtualizada(usuario, false)
                    this.setState({ usuario: initialState.usuario, lista })
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
                    placeholder="Nome do aluno"
                    className="form-input"
                    name="nome"

                    value={this.state.usuario.nome}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Email: </label>
                <input
                    type="text"
                    id="email"
                    placeholder="Email do usuario"
                    className="form-input"
                    name="email"

                    value={this.state.usuario.email}

                    onChange={e => this.atualizaCampo(e)}
                />
                <label> Senha: </label>
                <input
                    type="text"
                    id="senha"
                    placeholder="Senha do usuario"
                    className="form-input"
                    name="senha"

                    value={this.state.usuario.senha}

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
                <table className="listaUsuarios" id="tblListaUsuarios">
                    <thead>
                        <tr className="cabecTabela">
                            <th className="tabTituloNome">Nome</th>
                            <th className="tabTituloEmail">Email</th>
                            <th className="tabTituloSenha">Senha</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lista.map(
                            (usuario) =>

                                <tr key={usuario.id}>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.senha}</td>
                                    <td>
                                        <button onClick={() => this.carregar(usuario)} >
                                            Altera
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => this.remover(usuario)} >
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