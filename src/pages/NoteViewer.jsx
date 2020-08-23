import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

import axios from 'axios';

import Navbar from '../components/Home/Navbar';
import Title from '../components/Common/Title';
import FullHeightContainer from '../components/Common/FullHeightContainer';
import ContentWide from '../components/Common/ContentWide';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import Link from '../components/Common/Link';

import { ArrowLeftIcon } from '@primer/octicons-react';

var fs = require('fs');

export default function NoteViewer({ history, match }) {
    const {
        params: { noteId },
    } = match;

    const [user, setUser] = useState();
    const getUser = async () => {
        const { data, status } = await axios.get('/v1/curuser');
        if (status === 200) {
            setUser(data);
        }
    };

    const [file, setFile] = useState();

    const getFile = async () => {
        const { data, status } = await axios.post('/v1/files/get', {
            fileName: noteId
        });
        if (status === 200) {
            setFile(data);
        }
    };

    const goToProfile = async (username) => {
        history.push('/' + username);
    };

    useEffect(() => {
        getFile();
    }, [noteId])
    

    useEffect(() => {
        getUser();
    }, []);

    return (
        <FullHeightContainer>
            <Navbar user={user} goToProfileHandler={goToProfile} goToSignInHandler={() => history.push('/auth/login')} />
            <ContentWide>
                <div style={styles.noteContainer}>
                    {history && history.length > 2 &&
                        <div style={styles.backContainer} onClick={() => history.goBack()}>
                            <ArrowLeftIcon size={24} />
                            <div style={{ marginLeft: 5 }}>back</div>
                        </div>
                    }
                    <div className='notes'>
                        <ReactMarkdown source={file} />
                    </div>
                </div>
            </ContentWide>
        </FullHeightContainer>
    )
}

const styles = {
    noteContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 50,
        width: '100%',
    },
    backContainer: {
        display: 'flex',
        color: '#6A737D',
        cursor: 'pointer',
        alignItems: 'center',
    }
};