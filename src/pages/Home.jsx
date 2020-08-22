import React, { useState, useEffect } from 'react'

import axios from 'axios';

import { normalizeDate } from "../utils/helpers";

import Navbar from '../components/Auth/Navbar';
import Content from '../components/Common/Content';
import Title from '../components/Common/Title';
import Activity from '../components/Home/Activity';

export default function Home() {

    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [allActivity, setAllActivity] = useState({});

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

    const getAllActivity = async () => {
        const { data, status } = await axios.get('/v1/activity?dayCount=365');
        if (status === 200) {
            setAllActivity(data);
        }
    }

    useEffect(() => {
        getUser();
        getUsers();
        getAllActivity();
    }, []);

    useEffect(() => {
        console.log(users);
    }, [users]);

    return (
        <div>
            <Navbar user={user} />
            <Content>                
                { allActivity ?
                    Object.keys(allActivity).map(day => {
                        if (allActivity[day].length == 0) return;
                        return (
                            <div>
                                <Title>{normalizeDate(day)}</Title>
                                {allActivity[day].map(activity => (
                                    <Activity
                                        username={activity.username}
                                        fileName={activity.fileName}
                                        displayName={activity.fileDisplayName}
                                        edits={activity.edits}
                                        avatar={activity.avatar}
                                    />
                                ))}
                            </div>
                        )
                    }) : 
                    <div>
                        Looks a little empty. Upload some notes!
                    </div>
                }
            </Content>
        </div>
    )
}
