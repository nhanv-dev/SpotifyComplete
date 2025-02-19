import {Box} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Index from '../../../components/common/background-color';
import Helmet from '../../../components/common/Helmet';
import Header from '../../../components/web/layout/Header';
import Layout from "../../../components/web/layout/Layout";
import SpotifyService from "../../../services/SpotifyService";
import ButtonGroupService from "../../../components/artist/button-group-service";
import DefaultArtistImage from "../../../assets/images/default-artist.jpg";
import {IconChecked} from "../../../components/common/Details";
import EditIcon from '@mui/icons-material/Edit';
import TracksSection from '../../../components/artist/sections/TracksSection';
import CardSection from '../../../components/artist/sections/CardSection';
import {useParams} from 'react-router-dom';

function Artist() {
    const {id} = useParams();
    const {user} = useSelector(state => state);
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artist, setArtist] = useState();
    useEffect(() => {
        if (!id) return;
        SpotifyService.getArtistById(id)
            .then(res => {
                setArtist(res.data.user)
            })
            .catch(err => {
                setArtist(null);
            })
        SpotifyService.getSongByArtistId(id)
            .then(res => {
                setTracks([...res.data.songs.map(song => ({...song, type: 'track'}))])
            })
            .catch(err => {
                setTracks([])
            })

        SpotifyService.getAlbumsByArtistId(id)
            .then(res => {
                console.log(res);
                setAlbums([...res.data.albums.map(album => ({...album, type: 'album'}))])
            })
            .catch(err => {
                setAlbums([])
            })
    }, [id])

    return (
        <Helmet title={artist?.name} style={{position: 'relative'}}>
            <Layout>
                <Header>
                    <ButtonGroupService/>
                </Header>
                <Index/>
                <Box sx={{p: 3}}>
                    {artist && <ArtistProfile artist={artist}/>}
                </Box>
                <Box sx={{p: 3}}>
                    <TracksSection items={tracks} createdAt={true} hasAlbum={true}/>
                </Box>
                <Box sx={{p: 3}}>
                    {albums?.length > 0 &&
                        <CardSection items={albums} title={`Album của ${artist?.name}`} type="album"/>}
                </Box>
            </Layout>
        </Helmet>

    );
};

const ArtistProfile = ({artist}) => {

    return (
        <Box sx={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
            <Box
                component="div"
                sx={{
                    width: '230px',
                    height: '230px',
                    position: 'relative',
                    backgroundColor: '#333',
                    boxShadow: '0 4px 60px rgb(0 0 0 / 50%)',
                    borderRadius: '50%',
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="img"
                    src={artist?.imageUrl || DefaultArtistImage}
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: '0',
                        left: '0',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        borderRadius: '50%'
                    }}
                />
            </Box>
            <Box sx={{
                maxHeight: '230px',
                height: '230px',
                display: 'flex',
                flexDirection: "column",
                justifyContent: artist.title?.length > 20 ? "flex-end" : "space-between",
                flexWrap: "nowrap",
                gap: '2.5rem'
            }}>
                <Box mt={2} sx={{
                    display: 'flex', gap: 6,
                }}>
                    <Box
                        sx={{
                            fontSize: '.9rem',
                            fontWeight: '600',
                            textTransform: 'uppercase',
                            display: 'flex', alignItems: 'center'
                        }}>
                        <IconChecked/>
                    </Box>
                </Box>
                <Box sx={{
                    fontSize: artist.title?.length > 15 ? '2.5rem' : '5.5rem',
                    fontWeight: '700',
                    letterSpacing: '-0.04em'
                }}>
                    {artist.name}
                </Box>
                <Box sx={{color: 'white', fontWeight: '500', fontSize: '.9rem'}}>
                    {artist.label && <Box mb={1}>{artist.label}</Box>}
                    {artist.followers && <Box mb={1}>{artist.followers} người nghe hàng tháng</Box>}
                </Box>
            </Box>
        </Box>
    )
}

const EditArtistProfile = ({openEdit, artist}) => {


    return (
        <Box>


        </Box>
    )
}

export default Artist;


