import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import List from '../pages/List';
import Input from '../pages/Input';
import Detail from '../pages/Detail';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<List />} />
                <Route path="/input" element={<Input />} />
                <Route path="/detail" element={<Detail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
