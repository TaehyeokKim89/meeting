import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from '../pages/List';
import Input from '../pages/Input';
import Detail from '../pages/Detail';
import LoginPage from '../pages/LoginPage';
import Register from '../pages/Register';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/input" element={<Input />} />
                <Route path="/list/:id" element={<Detail />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
