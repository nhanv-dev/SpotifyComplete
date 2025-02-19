import {Box} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import TracksSection from "./TracksSection";
import BackgroundColor from '../../../components/common/background-color';
import Details from "../../../components/common/Details";
import Helmet from '../../../components/common/Helmet';
import Header from '../../../components/web/layout/Header';
import Layout from "../../../components/web/layout/Layout";
import SpotifyService from "../../../services/SpotifyService";
import ButtonGroupService from '../../../components/artist/button-group-service';
import {useParams} from 'react-router-dom';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import {playPlaylist} from "../../../redux/actions/audioActions";

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Album() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [songs, setSongs] = useState([]);
    const [info, setInfo] = useState({})
    useEffect(() => {
        SpotifyService.getAlbumById(id)
            .then(res => {
                const {_id, title} = res.data.album
                setInfo({...res.data.album, type: 'album'})
                setSongs(res.data.album.songs.map(song => ({...song, album: {_id, title}})))
            })
            .catch(err => {
                setInfo({})
                setSongs([])
            })
    }, [id])

    function handlePlay() {
        dispatch(playPlaylist({tracks: songs}))
    }

    return (
        <Helmet title={'Nhạc của tôi'} style={{position: 'relative'}}>
            <Layout>
                <Header>
                    <ButtonGroupService/>
                </Header>
                <BackgroundColor/>
                <Box sx={{p: 3}}>
                    <Details info={{...info}}/>
                    <Box sx={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', gap: 3, mt: 5}}>
                        <Box component={"button"} onClick={handlePlay} variant="contained"
                             sx={{
                                 color: 'white',
                                 p: 1,
                                 fontSize: '0.85rem',
                                 width: '56px',
                                 height: '56px',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 borderRadius: '50px',
                                 cursor: 'pointer',
                                 boxShadow: 'none',
                                 border: 'none',
                                 outline: 'none',
                                 fontWeight: '500',
                                 backgroundColor: 'var(--primary-color)',
                             }}>
                            <PlayArrowIcon sx={{fontSize: '2.75rem'}}/>
                        </Box>
                        <Box component={"button"} variant="contained"
                             sx={{
                                 color: 'white',
                                 p: 1,
                                 fontSize: '0.85rem',
                                 width: '44px',
                                 height: '44px',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 borderRadius: '50px',
                                 cursor: 'pointer',
                                 boxShadow: 'none',
                                 border: 'none',
                                 outline: 'none',
                                 fontWeight: '500',
                                 backgroundColor: '#473440',
                                 '&:hover': {
                                     backgroundColor: '#473440',
                                     boxShadow: 'none',
                                 }
                             }}
                        >
                            <FavoriteBorderIcon sx={{position:'relative',top:'1px'}}/>
                        </Box>
                    </Box>
                    <Box sx={{my: 5}}>
                        <TracksSection items={songs || []} createdAt={true} hasAlbum={true}/>
                    </Box>
                </Box>
            </Layout>
        </Helmet>

    );
}

export default Album;


