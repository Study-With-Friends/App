import React, { useState, useEffect } from 'react';

import axios from 'axios';
import {
    MortarBoardIcon,
    LocationIcon,
    PeopleIcon,
} from '@primer/octicons-react';

import Navbar from '../components/Profile/Navbar';
import Content from '../components/Common/Content';
import Name from '../components/Profile/Name';
import Details from '../components/Profile/Details';
import DetailRow from '../components/Profile/DetailRow';
import Title from '../components/Common/Title';
import InfoMessage from '../components/Common/InfoMessage';
import UserAvatar from '../components/Common/UserAvatar';
import NoteItem from '../components/Profile/NoteItem';
import Button from '../components/Common/Button';

const defaultPfp = require('../assets/default-pfp.png');

function Profile({ match, history }) {
    const {
        params: { username },
    } = match;

    const [userData, setUserData] = useState(null);
    const [sortedEditHistoryDates, setSortedEditHistoryDates] = useState([]);

    const getUserData = async () => {
        const { data: userData, status: userStatus } = await axios.post(
            '/v1/user/profile',
            {
                username,
                dayCount: 365,
            }
        );
        if (userStatus === 200) {
            setUserData(userData);
        }
    };

    useEffect(() => {
        getUserData();
    }, [username]);

    const [user, setUser] = useState();
    const [followingUser, setFollowingUser] = useState(false);

    const getUser = async () => {
        const { data, status } = await axios.get('/v1/curuser');
        if (status === 200) {
            setUser(data);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        if (userData) {
            if (userData.history) {
                const numDays = 365;

                const newSortedEditHistoryDates = [];

                for (let i = 0; i < numDays; i++) {
                    const newDate = new Date();
                    newDate.setDate(newDate.getDate() - i);
                    newSortedEditHistoryDates.push(
                        newDate.toISOString().split('T')[0]
                    );
                }

                setSortedEditHistoryDates(newSortedEditHistoryDates.slice(0).reverse());
            }
            if (user && userData.profile && userData.profile.followerList) {
                for (const follower of userData.profile.followerList) {
                    if (follower.id === user.id) {
                        setFollowingUser(true);
                    } else {
                        setFollowingUser(false);
                    }
                }
            }
        }
    }, [userData]);

    let sortedFileList;
    if (userData && userData.file_list) {
        sortedFileList = userData.file_list;
        sortedFileList.sort((a, b) => {
            return new Date(b.lastModified) - new Date(a.lastModified);
        });
    }

    let isOwnProfile = false;
    if (user && userData && userData.profile) {
        isOwnProfile = user.username === userData.profile.username;
    }

    const followUser = async () => {
        await axios.post('/v1/user/follow', {
            username,
        });
        getUserData();
    };

    const unfollowUser = async () => {
        await axios.post('/v1/user/unfollow', {
            username,
        });
        getUserData();
    };

    const openNote = (noteId) => {
        history.push('/viewer/' + noteId);
    };

    return (
        <div>
            <Navbar user={user} goToSignInHandler={() => history.push('/auth/login')}/>
            {userData && (
                <Content>
                    {userData.profile && (
                        <div style={styles.userInfoContainer}>
                            <UserAvatar
                                className="has-margin"
                                src={userData.profile.avatar || defaultPfp}
                            />
                            <Name>{userData.profile.name}</Name>
                            <Details>
                                {!isOwnProfile && (
                                    <Button
                                        className="sm"
                                        onClick={() => {
                                            if (followingUser) {
                                                setFollowingUser(false);
                                                unfollowUser();
                                            } else {
                                                setFollowingUser(true);
                                                followUser();
                                            }
                                        }}
                                        style={{ marginBottom: 10 }}
                                    >
                                        {followingUser ? 'Unfollow' : 'Follow'}
                                    </Button>
                                )}
                                <DetailRow className="mono">
                                    <PeopleIcon style={styles.icon} />
                                    <div>
                                        <span
                                            style={{
                                                fontWeight: 'bold',
                                                marginRight: 5,
                                            }}
                                        >
                                            {
                                                userData.profile.followerList
                                                    .length
                                            }
                                        </span>
                                        followers
                                    </div>
                                    <div
                                        style={{
                                            marginLeft: 8,
                                            marginRight: 8,
                                        }}
                                    >
                                        ·
                                    </div>
                                    <div>
                                        <span
                                            style={{
                                                fontWeight: 'bold',
                                                marginRight: 5,
                                            }}
                                        >
                                            {
                                                userData.profile.followingList
                                                    .length
                                            }
                                        </span>
                                        following
                                    </div>
                                </DetailRow>
                                <DetailRow className="mono">
                                    <MortarBoardIcon style={styles.icon} />
                                    {userData.profile.school ||
                                        'School not set'}
                                </DetailRow>
                                <DetailRow className="mono">
                                    <LocationIcon style={styles.icon} />
                                    {userData.profile.location ||
                                        'Location not set'}
                                </DetailRow>
                            </Details>
                        </div>
                    )}
                    <Title>activity</Title>
                    {userData.history && (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                        >
                            {sortedEditHistoryDates.map((date) => {
                                const edits = userData.history[date];
                                return (
                                    <div
                                        className="hover-square"
                                        title={date + ` ~ ${edits} edits`}
                                        style={{
                                            width: 8,
                                            height: 8,
                                            margin: 1,
                                            borderRadius: 1,
                                            backgroundColor: '#eeeeee',
                                            cursor: 'pointer',
                                        }}
                                        key={date}
                                    >
                                        <div
                                            style={{
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                background: '#5adc5a',
                                                opacity:
                                                    edits > 0
                                                        ? Math.log10(edits) / 3
                                                        : 0,
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <Title style={{ marginTop: 40 }}>notes</Title>
                    {sortedFileList && sortedFileList.length > 0 ? (
                        <div>
                            {sortedFileList.map((note) => (
                                <NoteItem
                                    key={note.name}
                                    className="mono"
                                    openNoteHandler={openNote}
                                    noteData={note}
                                />
                            ))}
                        </div>
                    ) : (
                        <InfoMessage className="mono">
                            There's nothing here right now :(
                        </InfoMessage>
                    )}
                </Content>
            )}
        </div>
    );
}

const styles = {
    userInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
};

export default Profile;
