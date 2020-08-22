import React from 'react';

import UserAvatar from '../Common/UserAvatar';
import Card from '../Common/Card';

const defaultPfp = require('../../assets/default-pfp.png');

function Activity({ username, fileName, displayName, edits }) {
    return (
        <Card style={styles.horizontal}>
            <div className="left" style={styles.horizontalCentered}>
                <UserAvatar className="sm" src={defaultPfp} style={styles.avatar} />
                <div style={styles.vertical}>
                    <span><b>{username}</b> created a new note</span>
                    <span className="mono">{displayName}</span>
                </div>
            </div>

            <div className="right">
            </div>
        </Card>
    )
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
    }
}

export default Activity;
