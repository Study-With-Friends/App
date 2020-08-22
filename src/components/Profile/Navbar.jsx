import React from 'react';
const logo = require('../../assets/logo.svg');

export default function Navbar({ user }) {
    return (
        <div style={styles.navbar}>
            <div style={styles.navbarContainer}>
            <a href="/">
                <img style={styles.logo} src={logo}/>
            </a>
            <a className="uppercase bold" style={styles.action}>{user ? user.name : 'My Profile'}</a>
            </div>
        </div>
    )
}

const styles = {
    navbar: {
        display: 'flex',
        // borderBottom: '1px solid #e5e5e5',
        justifyContent: 'center',
    },
    navbarContainer: { 
        maxWidth: 1278,
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        marginTop: 20,
        marginBottom: 10,
    },
    logo: {
        width: 24,
        height: 24,
        cursor: 'pointer',
    },
    action: {
        fontSize: 11,
    },
}