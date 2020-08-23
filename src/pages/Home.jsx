import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { normalizeDate } from '../utils/helpers';

import Navbar from '../components/Home/Navbar';
import ContentWide from '../components/Common/ContentWide';
import Title from '../components/Common/Title';
import Activity from '../components/Home/Activity';
import Tabs from '../components/Common/Tabs';
import Tab from '../components/Common/Tab';
import User from '../components/Home/User';

export default function Home({ history }) {
    const [user, setUser] = useState();
    const [users, setUsers] = useState();
    const [allActivity, setAllActivity] = useState();
    const [activityForFiles, setActivityForFiles] = useState({});
    const [currentTab, setCurrentTab] = useState('activity');

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
        const { data, status } = await axios.get('/v1/activity?dayCount=30');
        if (status === 200) {
            setAllActivity(data.activities);
            setActivityForFiles(data.edits_for_file)
        }
    };

    const goToProfile = async (username) => {
        history.push('/' + username);
    };

    const goToFile = async (fileName) => {
        history.push('/viewer/' + fileName);
    };

    useEffect(() => {
        getAllActivity();
        getUser();
        getUsers();
    }, []);

    return (
        <div>
            <Navbar
                user={user}
                goToSignInHandler={() => history.push('/auth/login')}
                goToProfileHandler={goToProfile}
            />
            <ContentWide>
                <Tabs style={{ marginBottom: 20 }}>
                    <Tab
                        className={currentTab === 'activity' ? 'active' : ''}
                        onClick={() => setCurrentTab('activity')}
                    >
                        activity
                    </Tab>
                    <Tab
                        className={currentTab === 'users' ? 'active' : ''}
                        onClick={() => setCurrentTab('users')}
                    >
                        users
                    </Tab>
                </Tabs>
                {currentTab === 'activity' &&
                    (allActivity ? (
                        Object.keys(allActivity).map((day, i) => {
                            return (
                                <div key={'activity_' + i}>
                                    {allActivity[day].length > 0 && <Title>{normalizeDate(day)}</Title>}
                                    {allActivity[day].map((activity) => {
                                        return (
                                            <Activity
                                                key={
                                                    'act_obj_' +
                                                    activity.file.name
                                                }
                                                username={
                                                    activity.owner.username
                                                }
                                                fileName={activity.file.name}
                                                action={activity.eventType}
                                                displayName={
                                                    activity.file.displayName
                                                }
                                                edits={activity.file.name in activityForFiles ? activityForFiles[activity.file.name] : []}
                                                avatar={activity.owner.avatar}
                                                goToFileHandler={goToFile}
                                            />
                                        );
                                    })}
                                </div>
                            );
                        })
                    ) : (
                        <div>Loading...</div>
                    ))}
                <div>
                    {currentTab === 'users' &&
                        users &&
                        users.map((listUser) => {
                            if (listUser.username !== user.username) {
                                return (
                                    <User
                                        key={'usr_obj_' + user.username}
                                        avatar={listUser.avatar}
                                        name={listUser.name}
                                        username={listUser.username}
                                        school={listUser.school}
                                        location={listUser.location}
                                        followers={listUser.followerList}
                                        following={listUser.followingList}
                                        goToProfileHandler={goToProfile}
                                    />
                                );
                            }
                            return null;
                        })}
                </div>
            </ContentWide>
        </div>
    );
}
