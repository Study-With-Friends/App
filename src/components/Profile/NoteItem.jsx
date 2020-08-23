import React from 'react';
import moment from 'moment';

function NoteItem({ noteData, openNoteHandler }) {
    const curUTC = new Date().toISOString();
    const curUTCStr = curUTC.substr(0, curUTC.length - 1);
    const diff = moment.duration(
        moment(noteData.lastModified).diff(moment(curUTCStr))
    );
    console.log(noteData.lastModified);
    console.log(new Date().toISOString());
    return (
        <div
            style={{
                display: 'flex',
                flex: 1,
                cursor: 'pointer',
                justifyContent: 'space-between',
                marginBottom: 15,
            }}
            onClick={() => {
                openNoteHandler(noteData.name);
            }}
        >
            <div>{noteData.displayName}</div>
            <div
                style={{
                    color: 'grey',
                }}
            >
                {diff.humanize(true)}
            </div>
        </div>
    );
}

export default NoteItem;
