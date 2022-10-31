import React from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/template/Main';
import CrudAluno from './components/CrudAluno/CrudAluno';
import CrudCurso from './components/CrudCurso/CrudCurso';
import Produtos from './components/ListaProdutos/Produtos'

export default function Rotas() {
    return (
        <Routes>
            <Route exact path='/'
                element={
                    <Main title="Bem Vindo(a)!">
                        <div>Venda de jogos virtuais</div>
                    </Main>}
            />

            <Route path='/alunos' element={<CrudAluno />} />
            <Route path='/cursos' element={<CrudCurso />} />
            <Route path='/produtos' element={<Produtos />} />
            <Route path='*' element={
                <Main title="Bem Vindo(a)!">
                    <div>Página não encontrada</div>
                </Main>} />
        </Routes>
    )
}