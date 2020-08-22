import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Navbar from '../components/Auth/Navbar';
import Title from '../components/Common/Title';
import FullHeightContainer from '../components/Common/FullHeightContainer';
import Content from '../components/Common/Content';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import Link from '../components/Common/Link';

const logo = require('../assets/logo.svg');

function Login({ history }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    // error state
    const [responseMessage, setResponseMessage] = useState();
    const [success, setSuccess] = useState(false);

    const [usernameError, setUsernameError] = useState();
    const [passwordError, setPasswordError] = useState();

    useEffect(() => {
        if (username) setUsernameError();
        if (password) setPasswordError();
    }, [username, password]);

    const doLogin = async () => {
        if (!username) {
            setUsernameError("Please enter a username");
            return;
        }
        if (!password) {
            setPasswordError("Please enter a password");
            return;
        }

        try {
            const { data, status } = await axios.post('/v1/curuser/login', {
                username: username,
                password: password, 
            });

            if (status === 200) {
                history.push('/');
            } 
        } catch (err) {
            if (err.response) {
                const { data, status } = err.response;
                setResponseMessage(data);
            } else {
                setResponseMessage('oops, something went wrong.');
            }
            setSuccess(false);
        }
    };

    return (
        <FullHeightContainer>
            {/* <Navbar /> */}
            <Content style={styles.vCenter}>
                <div style={styles.logoContainer}>
                    <img src={logo} style={styles.logo} />
                </div>
                <Title>log in</Title>
                <span className={'mono ' + (success ? 'success' : 'error')} style={{ marginBottom: 5 }}>{responseMessage}</span>
                <Input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                {usernameError &&
                    <span className="error mono" style={{ marginBottom: 5 }}>{usernameError}</span>
                }
                <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                {passwordError &&
                    <span className="error mono" style={{ marginBottom: 5 }}>{passwordError}</span>
                }
                <Button onClick={() => doLogin()}>Log In</Button>
                <p class="mono centered" style={styles.subText}>
                    Don't have an account?
                    <Link href="/auth/signup"> Sign up</Link>instead
                </p>
            </Content>
        </FullHeightContainer>
    )
}

const styles = {
    vCenter: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center'
    },
    subText: { 
        fontSize: 12,
        color: '#6A737D',
        marginTop: '2em',
    },
    logo: {
        height: 64,
        width: 64,
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50  
    },
};

export default Login;
