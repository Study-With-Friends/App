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

function Signup({ history }) {

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [school, setSchool] = useState();
    const [location, setLocation] = useState();

    // error state
    const [responseMessage, setResponseMessage] = useState();
    const [success, setSuccess] = useState(false);

    const [nameError, setNameError] = useState();
    const [usernameError, setUsernameError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [schoolError, setSchoolError] = useState();
    const [locationError, setLocationError] = useState();

    useEffect(() => {
        if (name) setNameError();
        if (username) setUsernameError();
        if (password) setPasswordError();
    }, [username, password]);

    const doSignup = async () => {
        if (!name) {
            setNameError("Please enter your name");
            return;
        }
        if (!school) {
            setSchoolError("Please enter your school")
            return;
        }
        if (!location) {
            setSchoolError("Please enter your location")
        }
        if (!username) {
            setUsernameError("Please enter a username");
            return;
        }
        if (!password) {
            setPasswordError("Please enter a password");
            return;
        }


        try {
            const { data, status } = await axios.post('/v1/curuser/register', {
                name,
                username,
                password, 
                school,
                location
            });

            if (status === 200) {
                setResponseMessage("sign up successful! redirecting to login...");
                setTimeout(() => {
                    history.push('/auth/login');
                }, 3000);
                setSuccess(true);
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
            <Content style={styles.vCenter}>
                <div style={styles.logoContainer}>
                    <img src={logo} style={styles.logo} />
                </div>
                <Title>sign up</Title>
                <span className={'mono ' + (success ? 'success' : 'error')} style={{ marginBottom: 5 }}>{responseMessage}</span>
                <Input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
                {nameError &&
                    <span className="error mono" style={{ marginBottom: 5 }}>{nameError}</span>
                }
                <Input type="text" placeholder="School" value={school} onChange={e => setSchool(e.target.value)} />
                {schoolError &&
                    <span className="error mono" style={{ marginBottom: 5 }}>{schoolError}</span>
                }
                <Input type="text" placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
                {locationError &&
                    <span className="error mono" style={{ marginBottom: 5 }}>{locationError}</span>
                }
                <Input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
                {usernameError &&
                    <span className="error mono" style={{ marginBottom: 5 }}>{usernameError}</span>
                }
                <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                {passwordError &&
                    <span className="error mono" style={{ marginBottom: 5 }}>{passwordError}</span>
                }
                <Button className="inversed" onClick={() => doSignup()}>Sign up</Button>
                <p class="mono centered" style={styles.subText}>
                    Already have an account?
                    <Link href="/auth/login"> Log in</Link>instead
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

export default Signup;
