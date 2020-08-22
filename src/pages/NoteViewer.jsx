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
            <Content style={styles.vCenter}>
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
    vCenter: {
        flex: 1,
        justifyContent: 'center'
    },
    subText: { 
        fontSize: 12,
        color: '#6A737D',
        marginTop: '2em',
    },
    notes: {
        background: '#ebebeb',
    }
};