import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '@/src/app/auth/login/page';
import Register from '@/src/app/auth/register/page';
import Home from '@/src/app/page';

export default function route(){
    const [token, setToken] = useState(false);

    if (token) {
        sessionStorage.setItem('token', JSON.stringify(token))
    }

    useEffect(() => {
        if(sessionStorage.getItem('token')) {
            let data = JSON.parse(sessionStorage.getItem('token')!);
            setToken(data);
        }

    }, [])

    return (
        <div>
            <Route path={'/auth/register'} element={<Register />} />
            <Route path={'/auth/login'} element={<Login setToken={setToken} />} />
            {token ? <Route path={'/'} element={<Home />} /> : ""}
            
        </div>
    )
}