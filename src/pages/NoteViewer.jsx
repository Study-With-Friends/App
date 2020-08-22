import React from 'react'

export default function NoteViewer({ match }) {
    const {
        params: { noteId },
    } = match;
    return (
        <div>
            Note viewer
            vieweing note: { noteId }
        </div>
    )
}
