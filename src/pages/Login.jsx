import React from 'react'

import Navbar from '../components/Auth/Navbar';
import Title from '../components/Common/Title';
import FullHeightContainer from '../components/Common/FullHeightContainer';
import Content from '../components/Common/Content';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import Link from '../components/Common/Link';

function Login() {
    return (
        <FullHeightContainer>
            <Navbar />
            <Content style={styles.vCenter}>
                <Title>log in</Title>
                <Input type="text" placeholder="Email"/>
                <Input type="password" placeholder="Password"/>
                <Button>Log In</Button>
                <p class="mono centered" style={styles.subText}>
                    Don't have an account?
                    <Link href="/auth/signup">Sign up</Link>instead
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
