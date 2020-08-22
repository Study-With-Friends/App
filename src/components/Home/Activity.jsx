import React from 'react';
import styled from 'styled-components';

import UserAvatar from '../Common/UserAvatar';
import Card from '../Common/Card';
import CardBody from '../Common/CardBody';
import Pulse from '../Home/Pulse';

import { formatDate } from '../../utils/helpers';

const defaultPfp = require('../../assets/default-pfp.png');

const UserLink = styled.a`
    text-decoration: none;
    color: black;
    font-weight: bold;
    &:hover {
        text-decoration: underline;
    }
`;

function Activity({ username, fileName, displayName, edits, avatar }) {
    const editsPerDay = {};
    const numDays = 30;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // pre-populate edits per day
    for (let i = 0; i < numDays; i++) {
        const newDate = today;
        newDate.setDate(newDate.getDate() - i);
        editsPerDay[formatDate(newDate)] = 0;
    }

    edits.forEach((edit) => {
        const editDate = edit.split(' ')[0];
        console.log(editDate);
        if (editDate in editsPerDay) {
            editsPerDay[editDate] += 1;
        }
    });

    return (
        <Card>
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
                        <span>
                            <UserLink href={`/${username}`}>
                                <b>{username}</b>
                            </UserLink>{' '}
                            created a new note
                        </span>
                        <span className="mono">{displayName}</span>
                    </div>
                </div>

                <div className="right">
                    <Pulse
                        description="Pulse"
                        title=""
                        data={Object.values(editsPerDay).reverse()}
                    />
                </div>
            </CardBody>
        </Card>
    );
}

const styles = {
    horizontal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    horizontalCentered: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    vertical: {
        display: 'flex',
        flexDirection: 'column',
    },
    avatar: {
        marginRight: 10,
    },
};

export default Activity;
