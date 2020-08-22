import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

import axios from 'axios';

import Navbar from '../components/Auth/Navbar';
import Title from '../components/Common/Title';
import FullHeightContainer from '../components/Common/FullHeightContainer';
import Content from '../components/Common/Content';
import Input from '../components/Common/Input';
import Button from '../components/Common/Button';
import Link from '../components/Common/Link';

var fs = require('fs');

export default function NoteViewer({ match }) {
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
    useEffect(() => {
        getFile();
    }, [noteId])
    

    useEffect(() => {
        getUser();
    }, []);

    return (
        <FullHeightContainer>
            <Navbar user={user} />
            <Content style={styles.noteContainer}>
            <Title>Your Note</Title>      
            {/* viewing note: { noteId } */}
            <div className='notes' style={styles.notes}>
            <ReactMarkdown source={file} />
            </div>
            </Content>
            </FullHeightContainer>
    )
}

const styles = {
    noteContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    notes: {
        // background: '#ebebeb',
        borderStyle: 'outset',
        boxShadow: '5px 10px',
    }
};