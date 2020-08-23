import React from 'react';
import styled from 'styled-components';

import UserAvatar from '../Common/UserAvatar';
import Card from '../Common/Card';
import CardBody from '../Common/CardBody';
import Button from '../Common/Button';

import { MortarBoardIcon } from '@primer/octicons-react';
import DetailRow from '../Profile/DetailRow';

const defaultPfp = require('../../assets/default-pfp.png');

const UserLink = styled.a`
    text-decoration: none;
    color: black;
`;

function User({ id, avatar, name, username, school, location, followers, following, goToProfileHandler }) {

    return (
        <Card onClick={() => goToProfileHandler(username)}>
            <CardBody style={styles.horizontal}>
                <div className="left" style={styles.horizontalCentered}>
                    <a href={`/${username}`}>
                        <UserAvatar
                            className="sm"
                            src={avatar || defaultPfp}
                            style={styles.avatar}
                        />
                    </a>
                    <div style={styles.vertical}>
                        <div style={styles.split}>
                            <span style={styles.name}>
                                <b>{name}</b>{' '}
                                <span style={styles.username}>{username}</span>
                            </span>
                            <Button className="sm" style={{ margin: 0 }}>Follow</Button>
                        </div>
                        <DetailRow className="mono">
                            <MortarBoardIcon style={styles.icon}/> {school}
                        </DetailRow>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

const styles = {
    horizontal: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    horizontalCentered: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    vertical: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
    },
    avatar: {
        marginRight: 10,
    },
    split: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    name: {
        fontSize: 16,
    },
    username: {
        fontSize: 16,
        color: '#6A737D',
    }
};

export default User;
