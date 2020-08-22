import React from 'react';

import UserAvatar from '../Common/UserAvatar';
import Card from '../Common/Card';
import Pulse from '../Home/Pulse';

import { formatDate } from '../../utils/helpers';

const defaultPfp = require('../../assets/default-pfp.png');

function Activity({ username, fileName, displayName, edits }) {
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
        <Card style={styles.horizontal}>
            <div className="left" style={styles.horizontalCentered}>
                <UserAvatar
                    className="sm"
                    src={defaultPfp}
                    style={styles.avatar}
                />
                <div style={styles.vertical}>
                    <span>
                        <a href={`/${username}`}>
                            <b>{username}</b>
                        </a>{' '}
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
