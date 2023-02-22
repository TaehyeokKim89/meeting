import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import axios from 'axios';

const useAuthorization = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);

    const token = Cookies.get('token');
    const authCheck = async () => {
        await axios.get('http://3.38.191.164/login/user', {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
    };

    useEffect(() => {
        authCheck();
    }, [token]);

    return { isLogin: boolean(token) };
};

export default useAuthorization;
