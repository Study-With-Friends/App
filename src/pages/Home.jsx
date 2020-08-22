import React, { useState, useEffect } from 'react'

import axios from 'axios';

import Navbar from '../components/Auth/Navbar';

export default function Home() {

    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [activity, setActivity] = useState({});

    useEffect(() => {
        console.log(user);
    }, [user]);

    const getUser = async () => {
        const { data, status } = await axios.get('/v1/curuser');
        if (status === 200) {
            setUser(data);
        }
    };

    const getUsers = async () => {
        const { data, status } = await axios.get('/v1/users');
        if (status === 200) {
            setUsers(data);
        }
    }

    const getActivity = async () => {
        const { data, status } = await axios.get('/v1/activity', { dayCount: 365 });
        if (status === 200) {
            setActivity(data);
        }
    }

    useEffect(() => {
        getUser();
        getUsers();
        getActivity();
    }, []);

    useEffect(() => {
        console.log(users);
    }, [users]);

    return (
        <div>
            <Navbar user={user} />
            Home
        </div>
    )
}
