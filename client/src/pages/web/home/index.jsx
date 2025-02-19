import React, {memo, useEffect, useState} from 'react'
import Helmet from '../../../components/common/Helmet'
import Header from '../../../components/web/layout/Header'
import CardSection from '../../../components/web/sections/CardSection'
import Index from '../../../components/common/background-color'
import {Box} from '@mui/material'
import Layout from "../../../components/web/layout/Layout";
import {useSelector} from "react-redux";
import SpotifyService from "../../../services/SpotifyService";

const Home = () => {
    const {user} = useSelector(state => state);
    const [newReleases, setNewReleases] = useState()
    const [playlist, setPlaylist] = useState()
    const [album, setAlbum] = useState()
    const [myPlaylist, setMyPlaylist] = useState()

    useEffect(() => {
        SpotifyService.getAllSongs(0, 6)
            .then(res => {
                setNewReleases({title: 'Bản phát hành mới phổ biến', items: res.data.songs})
            })

        if (user?.info?._id) {
            SpotifyService.getPlaylistByUser(user?.info?._id)
                .then(res => {
                    setMyPlaylist({
                        title: 'Playlist của tôi',
                        items: res.data.playLists
                    })
                })
        }
    }, [])

    useEffect(() => {
        SpotifyService.getAllAlbum(0, 6)
            .then(res => {
                setAlbum({title: 'Album mới phổ biến', items: res.data.albums})
            })
    }, [])

    return (
        <Helmet title="Trình phát trên web" style={{position: 'relative'}}>
            <Layout>
                <Header></Header>
                <Index/>
                <Box sx={{p: 3}}>
                    {myPlaylist &&
                        <CardSection title={myPlaylist.title} desc={myPlaylist.desc} items={myPlaylist.items}
                                     url={"/collection"} type={"playlist"}/>}
                    {playlist &&
                        <CardSection title={playlist.title} desc={playlist.desc} items={playlist.items}
                                     type={"playlist"}/>}
                    {newReleases &&
                        <CardSection title={newReleases.title} desc={newReleases.desc} items={newReleases.items}
                                     url={"/albums"} type={"track"}/>}
                    {album &&
                        <CardSection title={album.title} desc={album.desc} items={album.items}
                                     url={"/albums"} type={"album"}/>}
                </Box>
            </Layout>
        </Helmet>

    );
};


export default memo(Home);