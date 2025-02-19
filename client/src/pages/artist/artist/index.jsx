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
import {Link} from "react-router-dom";

function Artist() {
    const {user} = useSelector(state => state);
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        if (!user?.info?._id) return;
        SpotifyService.getSongByArtistId(user.info._id)
            .then(res => {
                setTracks([...res.data.songs.map(song => ({...song, type: 'track'}))])
            })
            .catch(err => {
                setTracks([])
            })

        SpotifyService.getAlbumsByArtistId(user.info._id)
            .then(res => {
                setAlbums([...res.data.albums.map(album => ({...album, type: 'album'}))])
            })
            .catch(err => {
                setAlbums([])
            })
    }, [user])

    return (
        <Helmet title={user?.info?.name} style={{position: 'relative'}}>
            <Layout>
                <Header>
                    <ButtonGroupService/>
                </Header>
                <Index/>
                <Box sx={{p: 3}}>
                    <ArtistProfile artist={{...user?.info}}/>
                </Box>
                <Box sx={{p: 3}}>
                    <TracksSection items={tracks} createdAt={true} hasAlbum={true}/>
                </Box>
                <Box sx={{p: 3}}>
                    <CardSection items={albums} title="Album của tôi" type="album"/>
                </Box>
            </Layout>
        </Helmet>

    );
}

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
                    src={artist.imageUrl || DefaultArtistImage}
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
                    <Box component={Link} to={"/profile"}
                         sx={{
                             background: 'var(--primary-color)',
                             outline: 'none',
                             border: 'none',
                             textDecoration: 'none',
                             fontSize: '0.85rem',
                             fontWeight: 600,
                             color: 'white',
                             padding: '6px 12px',
                             borderRadius: '50px',
                             letterSpacing: '1px',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             gap: '6px',
                             cursor: 'pointer'
                         }}
                    >
                        <EditIcon sx={{width: '16px', height: '16px'}}/>
                        <Box sx={{position: 'relative', top: '0.8px'}}>
                            Edit Profile
                        </Box>
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


