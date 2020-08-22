import React, { useState, useEffect } from 'react';

import axios from 'axios';

import Navbar from '../components/Auth/Navbar';
import Title from '../components/Common/Title';
import FullHeightContainer from '../components/Common/FullHeightContainer';
import Content from '../components/Common/Content';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import Link from '../components/Common/Link';

function Login({ history }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // error state
    const [responseMessage, setResponseMessage] = useState();
    const [success, setSuccess] = useState(false);

    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();

    useEffect(() => {
        if (email) setEmailError();
        if (password) setPasswordError();
    }, [email, password]);

    const doLogin = async () => {
        if (!email) {
            setEmailError("Please enter a email");
            return;
        }
        if (!password) {
            setPasswordError("Please enter a password");
            return;
        }

        try {
            const { data, status } = await axios.post('/v1/curuser/login', {
                email: email,
                password: password, 
            });

            if (status === 200) {
                history.push('/');
            } 
        } catch (err) {
            const { data, status } = err.response;
            setResponseMessage(data ? data : 'oops, something went wrong.');
            setSuccess(false);
        }
    };

    return (
        <FullHeightContainer>
            <Navbar />
            <Content style={styles.vCenter}>
                <Title>log in</Title>
                <span className={'mono ' + (success ? 'success' : 'error')} style={{ marginBottom: 5 }}>{responseMessage}</span>
                <Input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                {emailError &&
                    <span className="error mono" style={{ marginBottom: 5 }}>{emailError}</span>
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
        flex: 1,
        justifyContent: 'center'
    },
    subText: { 
        fontSize: 12,
        color: '#6A737D',
        marginTop: '2em',
    }
};

export default Login;
