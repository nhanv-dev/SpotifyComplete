import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import TracksSection from "../../../components/artist/sections/TracksSection";
import Index from '../../../components/common/background-color';
import Details from "../../../components/common/Details";
import Helmet from '../../../components/common/Helmet';
import ButtonGroupService from "../../../components/artist/button-group-service";
import Header from '../../../components/web/layout/Header';
import Layout from "../../../components/web/layout/Layout";
import * as routesConfig from '../../../config/routes';
import SpotifyService from "../../../services/SpotifyService";



const ListSong = () => {
    const { user } = useSelector(state => state);
    const [artist, setArtist] = useState({})
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        if (!user?.info?._id) return;
        SpotifyService.getSongByArtistId(user.info._id)
            .then(res => {
                setTracks([...res.data.songs.map(song => ({ ...song, type: 'track' }))])
            })
            .catch(err => {
                setTracks([])
            })
    }, [user])

    return (
        <Helmet title={'Nhạc của tôi'} style={{ position: 'relative' }}>
            <Layout>
                <Header>
                    <ButtonGroupService />
                </Header>
                <Index />
                <Box sx={{ p: 3 }}>
                    {artist && <Details info={{ ...user?.info, type: 'artist' }} />}
                    <Box sx={{ my: 5 }}>
                        <TracksSection items={tracks} info={{ createdAt: true }} />
                    </Box>
                </Box>
            </Layout>
        </Helmet>

    );
};
export default ListSong;


