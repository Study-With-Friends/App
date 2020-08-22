import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { MortarBoardIcon, LocationIcon } from '@primer/octicons-react';

import Navbar from '../components/Auth/Navbar';
import Content from '../components/Common/Content';
import Name from '../components/Profile/Name';
import Details from '../components/Profile/Details';
import DetailRow from '../components/Profile/DetailRow';
import Title from '../components/Common/Title';
import InfoMessage from '../components/Common/InfoMessage';
import UserAvatar from '../components/Profile/UserAvatar';

const defaultPfp = require('../assets/default-pfp.png');

function Profile({ match }) {
    const {
        params: { username },
    } = match;

    const [userData, setUserData] = useState(null);
    const [userEditHistory, setUserEditHistory] = useState(null);
    const [userNotes, setUserNotes] = useState([]);

    const getUserData = async () => {
        const { data: userData, status: userStatus } = await axios.post(
            '/v1/user/profile',
            {
                username,
                dayCount: 365,
            }
        );
        if (userStatus === 200) {
            setUserData(userData.profile);
            setUserEditHistory(userData.history);
            setUserNotes(userData.file_list);
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
            <Content>
                {userData && (
                    <div style={styles.userInfoContainer}>
                        <UserAvatar src={defaultPfp} />
                        <Name>{userData.name}</Name>
                        <Details>
                            <DetailRow className="mono">
                                <MortarBoardIcon style={styles.icon}/>
                                School not set
                            </DetailRow>
                            <DetailRow className="mono">
                                <LocationIcon style={styles.icon}/>
                                Location not set
                            </DetailRow>
                        </Details>
                    </div>
                )}
                <Title>activity</Title>
                {userEditHistory && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}
                    >
                        {sortedEditHistoryDates.map((date) => {
                            return (
                                <div
                                    style={{
                                        width: 8,
                                        height: 8,
                                        margin: 1.5,
                                        borderRadius: 1,
                                        backgroundColor:
                                            userEditHistory[date] > 0
                                                ? 'green'
                                                : '#EAEDF0',
                                    }}
                                    key={date}
                                />
                            );
                        })}
                    </div>
                )}

                <Title style={{ marginTop: 40 }}>notes</Title>
                {userNotes && userNotes.length > 0 ? (
                   <div
                   style={{
                       display: 'flex',
                       flexDirection: 'row',
                       flexWrap: 'wrap',
                   }}
               >
                   {userNotes.map((note) => (
                       <div>{JSON.stringify(note)}</div>
                   ))}
               </div> 
                ) : (
                    <InfoMessage className="mono">There's nothing here right now :(</InfoMessage>
                )}
            </Content>
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
}

export default Profile;