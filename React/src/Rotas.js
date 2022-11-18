import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";

import Main from './components/template/Main';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import AuthService from './Services/AuthService';
import Carrinho from './components/Carrinho/Carrinho';
import Produtos from './components/ListaProdutos/Produtos';
import AlterarUser from './components/AlterarUser/AlterarUser';
import AlterarProd from './components/AlterarProd/AlterarProd';

export default function Rotas() {

    const [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);



    return (
        <Routes>
            <Route exact path='/'
                element={
                    <Main title="Bem Vindo(a)!">
                        <div>Venda de jogos virtuais</div>
                    </Main>}
            />

            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />

            {currentUser ? (
            <Route path='/carrinho' element={<Carrinho />} />
            ) : (
            <Route path='/carrinho' element=
                            {<Main title="Carrinho">
                                <div>Não Autorizado!</div>
                            </Main>} />   
            )} 

            <Route path='/produtos' element={<Produtos />} />

            {currentUser ? (
            <Route path='/alterar' element={<AlterarUser />} />
            ) : (
            <Route path='/alterar' element=
                            {<Main title="Atualizar dados!">
                                <div>Não Autorizado!</div>
                            </Main>} />     
            )}

            {currentUser ? ( 
            <Route path='/alterProd' element={<AlterarProd />} />
            ) : (
            <Route path='/alterProd' element=
                            {<Main title="Alterar produtos!">
                                <div>Não Autorizado!</div>
                            </Main>} />

            )} 
            <Route path='*' element={
                <Main title="Bem Vindo(a)!">
                    <div>Página não encontrada</div>
                </Main>} />
        </Routes>
    )
}