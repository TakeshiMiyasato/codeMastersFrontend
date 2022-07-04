import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DocumentacionDetail from '../pages/Documentacion/DocumentacionDetail';
import DocumentacionList from '../pages/Documentacion/DocumentacionList';
import Quizz from '../pages/Documentacion/Quizz';
import Menu from '../pages/Menu/Menu';
import Ranking from '../pages/Menu/Ranking';
import ProgramacionDetail from '../pages/Programacion/ProgramacionDetail';
import ProgramacionList from '../pages/Programacion/ProgramacionList';
import LoginForm from '../pages/RegisterLogin/LoginForm';
import RegisterForm from '../pages/RegisterLogin/RegisterForm';

const RoutesParadox = () => {
    return (
        <Routes>
            <Route path='/' element={<LoginForm />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/ranking' element={<Ranking />} />
            <Route path='/documentacion' element={<DocumentacionList />} />
            <Route path='/documentacionDetail/:id' element={<DocumentacionDetail />} />
            <Route path='/programacion/' element={<ProgramacionList />} />
            <Route path='/programacionDetail/:id' element={<ProgramacionDetail />} />
            <Route path='/quizz/:id' element={<Quizz />} />
        </Routes>
    );
}

export default RoutesParadox;