import React from 'react'

export default function Profile({ match }) {
    const {
        params: { userId },
    } = match;
    return (
        <div>
            Profile
            User: { userId }
        </div>
    )
}
