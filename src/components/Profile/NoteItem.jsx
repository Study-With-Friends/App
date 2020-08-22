import React from 'react';
import moment from 'moment';

function NoteItem({ noteData, openNoteHandler }) {
    const diff = moment.duration(moment(noteData.lastModified).diff(moment()));
    return (
        <div
            style={{
                display: 'flex',
                flex: 1,
                cursor: 'pointer',
                justifyContent: 'space-between',
                marginBottom: 3,
            }}
            onClick={() => openNoteHandler(noteData.name)}
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
