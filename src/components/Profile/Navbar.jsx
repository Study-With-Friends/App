import React, { useState } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import axios from 'axios';

import UserAvatar from '../Common/UserAvatar';
const logo = require('../../assets/logo.svg');

export default function Navbar({ user, goToSignInHandler }) {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);

    const logout = async () => {
        const { data, status } = await axios.post('/v1/curuser/logout');
        goToSignInHandler();
    };

    return (
        <div style={styles.navbar}>
            <div style={styles.navbarContainer}>
                <a href="/">
                    <img style={styles.logo} src={logo}/>
                </a>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle tag="div">
                        <UserAvatar className="sm" src={user && user.avatar || undefined} />
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={logout}>Log Out</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
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
        marginBottom: 50,
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