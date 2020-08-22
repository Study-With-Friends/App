import React, { useState, useEffect } from 'react'

import axios from 'axios';

import { normalizeDate } from "../utils/helpers";

import Navbar from '../components/Home/Navbar';
import ContentWide from '../components/Common/ContentWide';
import Title from '../components/Common/Title';
import Activity from '../components/Home/Activity';
import Tabs from '../components/Common/Tabs';
import Tab from '../components/Common/Tab';

export default function Home() {

    const [user, setUser] = useState();
    const [users, setUsers] = useState();
    const [allActivity, setAllActivity] = useState({});
    const [currentTab, setCurrentTab] = useState('activity');

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
    };

    const getAllActivity = async () => {
        const { data, status } = await axios.get('/v1/activity?dayCount=365');
        if (status === 200) {
            setAllActivity(data);
        }
    }

    useEffect(() => {
        getAllActivity();
        getUser();
        getUsers();
    }, []);

    return (
        <div>
            <Navbar user={user} />
            <ContentWide>                
                <Tabs style={{ marginBottom: 20 }}>
                    <Tab className={currentTab === 'activity' ? 'active' : ''} onClick={() => setCurrentTab('activity')}>activity</Tab>
                    <Tab className={currentTab === 'users' ? 'active' : ''} onClick={() => setCurrentTab('users')}>users</Tab>
                </Tabs>
                { currentTab === 'activity' && allActivity ?
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
                { currentTab === 'users' && users &&
                    users.map(user => {
                        return (
                            <div>{JSON.stringify(user)}</div>
                        )
                    })
                }
            </ContentWide>
        </div>
    )
}
