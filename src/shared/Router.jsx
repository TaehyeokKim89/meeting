import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Register from '../pages/Register';
import Home from '../pages/Home';
import InputMeeting from '../pages/InputMeeting';
import DetailMeeting from '../pages/DetailMeeting';
import TestPg from '../pages/TestPg';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/input" element={<InputMeeting />} />
                <Route path="/list/:id" element={<DetailMeeting />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/test" element={<TestPg />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
