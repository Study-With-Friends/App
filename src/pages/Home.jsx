import React, { useState, useEffect } from 'react'

import axios from 'axios';

import Navbar from '../components/Auth/Navbar';

export default function Home() {

    const [user, setUser] = useState();

    useEffect(() => {
        console.log(user);
    }, [user]);

    const getUser = async () => {
        const { data, status } = await axios.get('/v1/curuser');
        if (status === 200) {
            setUser(data);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <Navbar user={user} />
            Home
        </div>
    )
}
