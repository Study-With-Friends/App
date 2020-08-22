import React, { useState, useEffect } from 'react';
import Navbar from '../components/Auth/Navbar';
import axios from 'axios';

export default function Profile({ match }) {
    const {
        params: { username },
    } = match;

    const [userData, setUserData] = useState(null);
    const [userEditHistory, setUserEditHistory] = useState(null);

    const getUserData = async () => {
        const { data: userData, status: userStatus } = await axios.post(
            '/v1/user/profile',
            {
                username,
            }
        );
        if (userStatus === 200) {
            setUserData(userData);
        }
        const { data: historyData, status: historyStatus } = await axios.post(
            '/v1/user/history',
            {
                userId: userData.id,
                dayCount: 416,
            }
        );
        if (historyStatus === 200) {
            setUserEditHistory(historyData);
        }
    };

    useEffect(() => {
        getUserData();
    }, [username]);

    const [user, setUser] = useState();
    const getUser = async () => {
        const { data, status } = await axios.get('/v1/curuser');
        if (status === 200) {
            setUser(data);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    let sortedEditHistoryDates;
    if (userEditHistory) {
        sortedEditHistoryDates = Object.keys(userEditHistory);
        sortedEditHistoryDates.sort();
    }

    return (
        <div>
            <Navbar user={user} />
            {userData && (
                <div>
                    <div>User ID: {userData.id}</div>
                    <div>Name: {userData.name}</div>
                    <div>Username: {userData.username}</div>
                </div>
            )}
            {userEditHistory && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: 1000,
                        flexWrap: 'wrap',
                    }}
                >
                    {sortedEditHistoryDates.map((date) => {
                        return (
                            <div
                                style={{
                                    width: 15,
                                    height: 15,
                                    margin: 2,
                                    backgroundColor:
                                        userEditHistory[date] > 0
                                            ? 'green'
                                            : 'grey',
                                }}
                                key={date}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
