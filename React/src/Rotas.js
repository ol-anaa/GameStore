import React from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/template/Main';
import Login from './components/Login/Login';
import Carrinho from './components/Carrinho/Carrinho';
import Produtos from './components/ListaProdutos/Produtos';
import Cadastro from './components/Cadastro/Cadastro';
import AlterarUser from './components/AlterarUser/AlterarUser';
import AlterarProd from './components/AlterarProd/AlterarProd';

export default function Rotas() {
    return (
        <Routes>
            <Route exact path='/'
                element={
                    <Main title="Bem Vindo(a)!">
                        <div>Venda de jogos virtuais</div>
                    </Main>}
            />

            <Route path='/login' element={<Login />} />
            <Route path='/carrinho' element={<Carrinho />} />
            <Route path='/produtos' element={<Produtos />} />
            <Route path='/cadastro' element={<Cadastro />} />
            <Route path='/alterar' element={<AlterarUser />} />
            <Route path='/alterProd' element={<AlterarProd />} />
            <Route path='*' element={
                <Main title="Bem Vindo(a)!">
                    <div>Página não encontrada</div>
                </Main>} />
        </Routes>
    )
}