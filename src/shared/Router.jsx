import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from '../pages/List';
import Input from '../pages/Input';
import Detail from '../pages/Detail';
import ModalPage from '../components/Modal';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/input" element={<Input />} />
                <Route path="/list/:id" element={<Detail />} />
                <Route path="/modal" element={<ModalPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
