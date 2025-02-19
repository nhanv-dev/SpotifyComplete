import {Box} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import BackgroundColor from '../../../components/common/background-color';
import Helmet from '../../../components/common/Helmet';
import Header from '../../../components/web/layout/Header';
import Layout from "../../../components/web/layout/Layout";
import './style.scss';
import {playPlaylist} from "../../../redux/actions/audioActions";
import TracksSection from "./TracksSection";
import SpotifyService from "../../../services/SpotifyService";
import Details from "./Details";
import {toast} from "react-toastify";

function LikedTracks() {
    const dispatch = useDispatch();
    const [songs, setSongs] = useState([]);
    const [info, setInfo] = useState({duration: 0, totalTracks: 0});

    useEffect(() => {
        SpotifyService.getLikedSongs()
            .then(res => {

                setSongs(res.data.songs)

            })
            .catch(err => {
            })
    }, [])

    useEffect(() => {
        let duration = 0, totalTracks = 0;
        songs.forEach(song => {
            duration += song.duration;
            totalTracks++;
        })
        setInfo({duration, totalTracks})
    }, [songs])

    function handlePlay() {
        dispatch(playPlaylist({tracks: songs}))
    }

    async function handleLikeSong(songId) {
        SpotifyService.likeSong(songId)
            .then(res => {
                setSongs(prev => prev.filter(song => song._id !== songId))
                toast.success(res.data.message)
            })
            .catch(err => {
                toast.error('Xảy ra lỗi. Vui lòng thử lại sau')
            })
    }

    return (
        <Helmet title={'Liked Song'} style={{position: 'relative'}}>
            <Layout>
                <Header/>
                <BackgroundColor/>
                <Box sx={{p: 3}}>
                    <Details {...info}/>
                    <Box sx={{my: 5}}>
                        <TracksSection info={{createdAt: true, hasAlbum: true}} items={songs || []}
                                       handleLikeSong={handleLikeSong}/>
                    </Box>
                </Box>
            </Layout>
        </Helmet>
    );
}

export default LikedTracks;


