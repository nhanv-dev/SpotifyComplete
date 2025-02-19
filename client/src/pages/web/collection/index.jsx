import {Box, Button} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import BackgroundColor from '../../../components/common/background-color';
import Helmet from '../../../components/common/Helmet';
import Header from '../../../components/web/layout/Header';
import Layout from '../../../components/web/layout/Layout';
import SpotifyService from '../../../services/SpotifyService';
import Playlist from './Playlist';
import {NavLink} from "react-router-dom";

const Collection = () => {
    const {user, playlist} = useSelector(state => state)
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        if (!user?.info?._id) return setPlaylists([]);
        SpotifyService.getPlaylistByUser(user.info._id)
            .then(res => {
                setPlaylists(res.data.playLists.map(playlist => ({...playlist, type: 'playlist'})))
            })
            .catch(err => {
                setPlaylists([])
            })
    }, [user, playlist])

    return (
        <Helmet title="Collection">
            <Layout>
                <Header>
                    <ButtonGroup/>
                </Header>
                <BackgroundColor/>
                <Box p={3}>
                    <Playlist title={'Playlist'} items={playlists} type={"playlist"}/>
                </Box>
            </Layout>
        </Helmet>

    );
}

const ButtonGroup = () => {
    const links = [
        {title: 'Playlist', url: '/collection'},
        {title: 'Podcast', url: '/collection/podcast'},
        {title: 'Nghệ sĩ', url: '/collection/artist'},
        {title: 'Album', url: '/collection/album'},
    ]
    return (
        <Box component='div'>
            {links.map(link => (
                <MyButton
                    key={link.title}
                    title={link.title}
                    url={link.url}/>
            ))}
        </Box>
    )
}
const MyButton = (props) => {
    return (
        <Button
            variant="contained"
            sx={{
                backgroundColor: 'transparent',
                color: 'white',
                boxShadow: 'none',
                textTransform: 'none',
                fontWeight: '500',
                letterSpacing: '.8px',
                '&.active': {
                    transition: 'all .2 ease',
                    backgroundColor: 'rgba(13,13,13,.65)',
                    boxShadow: 'none',
                },
                '&:hover': {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                }
            }}
            component={NavLink} to={props.url}
            activeClassName='active' exact='true'
        >

            {props.title}
        </Button>
    )
}
export default Collection;
