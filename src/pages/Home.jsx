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
    const [allActivity, setAllActivity] = useState({});
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
        const { data, status } = await axios.get('/v1/activity?dayCount=365');
        if (status === 200) {
            setAllActivity(data);
        }
    };

    const goToProfile = async (username) => {
        history.push('/' + username);
    };

    useEffect(() => {
        getAllActivity();
        getUser();
        getUsers();
    }, []);

    const editsForFile = {};
    Object.keys(allActivity).forEach((key) => {
        const activitiesForDay = allActivity[key];

        activitiesForDay.forEach((activity) => {
            if (!(activity.file.name in editsForFile)) {
                editsForFile[activity.file.name] = [];
            }
            editsForFile[activity.file.name].push(activity.timestamp);
        });
    });

    const renderedActivities = new Set();

    const sortedActivityDates = Object.keys(allActivity).sort().reverse();
    return (
        <div>
            <Navbar user={user} />
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
                    allActivity &&
                    sortedActivityDates.map((day, i) => {
                        let renderElement = false;
                        for (const activity of allActivity[day]) {
                            if (!renderedActivities.has(activity.file.name)) {
                                renderElement = true;
                                break;
                            }
                        }
                        if (!renderElement || allActivity[day].length === 0)
                            return null;
                        return (
                            <div key={'activity_' + i}>
                                <Title>{normalizeDate(day)}</Title>
                                {allActivity[day].map((activity) => {
                                    if (
                                        renderedActivities.has(
                                            activity.file.name
                                        )
                                    ) {
                                        return null;
                                    }
                                    renderedActivities.add(activity.file.name);
                                    return (
                                        <Activity
                                            key={
                                                'act_obj_' + activity.file.name
                                            }
                                            username={activity.owner.username}
                                            fileName={activity.file.name}
                                            action={activity.eventType}
                                            displayName={
                                                activity.file.displayName
                                            }
                                            edits={
                                                editsForFile[activity.file.name]
                                            }
                                            avatar={activity.owner.avatar}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
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
