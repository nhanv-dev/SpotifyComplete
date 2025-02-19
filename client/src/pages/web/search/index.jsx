import React, {useEffect, useState} from 'react';
import Helmet from '../../../components/common/Helmet'
import CardSection from '../../../components/web/sections/CardSection'
import MediaSection from '../../../components/web/sections/MediaSection'
import ResultCard from '../../../components/web/cards/ResultCard'
import Searching from '../../../components/common/Searching'
import Header from '../../../components/web/layout/Header'
import {Box, Grid, Typography} from '@mui/material';
import Layout from "../../../components/web/layout/Layout";
import SpotifyService from '../../../services/SpotifyService';
import Logo from '../../../assets/images/logo-white.png';

const Search = () => {
    const [topSearch, setTopSearch] = useState()
    const [tracks, setTracks] = useState([])
    const [playlists, setPlaylists] = useState([])
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [textSearch, setTextSearch] = useState('')
    const [hasResult, setHasResult] = useState(false)

    const handleSearchResults = (searching) => {
        setTextSearch(searching || null)
    }

    useEffect(() => {
        if (!textSearch) {
            setTracks([])
            setPlaylists([])
            setArtists([])
            setAlbums([])
            return;
        }
        SpotifyService.search(textSearch)
            .then(res => {
                const {songs, albums, artists, playlists} = res.data.result;
                setTracks(songs);
                setAlbums(albums);
                setArtists(artists);
                setPlaylists(playlists.map(playlist => ({
                    ...playlist, type: 'playlist',
                    artists: [playlist.user],
                })));
                handleSetTopSearch({songs, albums, artists, playlists})
            })
            .catch(err => {
                setTopSearch(null)
                setTracks([])
                setPlaylists([])
                setArtists([])
                setAlbums([])
            })
    }, [textSearch])


    useEffect(() => {
        if (!textSearch) return setHasResult(false)
        if (tracks?.length > 0 || artists?.length > 0 || albums?.length > 0 || playlists?.length > 0)
            setHasResult(true)
        else
            setHasResult(false);
    }, [tracks, albums, artists, playlists])

    function handleSetTopSearch({songs, albums, artists, playlists}) {
        if (songs && songs.length > 0) {
            setTopSearch({
                id: songs[0]._id,
                desc: songs[0].description,
                artists: songs[0].artists,
                name: songs[0].name || songs[0].title,
                imageUrl: songs[0].imageUrl,
                type: 'track',
            })
        } else if (albums && albums.length > 0) {
            setTopSearch({
                id: albums[0]._id,
                desc: albums[0].description,
                artists: albums[0].artists,
                name: albums[0].title,
                imageUrl: albums[0].imageUrl,
                type: 'album',
            })
        } else if (artists && artists.length > 0) {
            setTopSearch({
                id: artists[0]._id,
                desc: artists[0].description,
                artists: artists[0].artists,
                name: artists[0].title,
                imageUrl: artists[0].imageUrl,
                type: 'artist',
            })
        } else if (playlists && playlists.length > 0) {
            setTopSearch({
                id: playlists[0]._id,
                desc: playlists[0].description,
                name: playlists[0].name,
                artists: [playlists[0].user],
                imageUrl: playlists[0].imageUrl,
                type: 'playlist',
            })
        }
    }

    return (
        <Helmet title="Tìm kiếm">
            <Layout>
                <Header>
                    <Searching handleSearchResults={handleSearchResults}/>
                </Header>
                {!textSearch && <TextLabel label={"Let's start with your Spotify"}/>}
                {textSearch &&
                    <Box>
                        {hasResult ?
                            <Box sx={{p: 3}}>
                                <Grid container spacing={3}>
                                    <Grid item xl={4} lg={5} md={6} sm={7}>
                                        {topSearch && <ResultCard item={topSearch}/>}
                                    </Grid>
                                    <Grid item xl={8} lg={7} md={6} sm={12}>
                                        {tracks?.length > 0 &&
                                            <MediaSection title="Bài hát" items={tracks.slice(0, 4)}/>}
                                    </Grid>
                                </Grid>
                                {artists?.length > 0 && <CardSection items={artists} title="Nghệ sĩ" type="artist"/>}
                                {playlists?.length > 0 &&
                                    <CardSection items={playlists} title="Playlist" type="playlist"/>}
                                {albums?.length > 0 && <CardSection items={albums} title="Album" type="album"/>}
                            </Box> :
                            <TextLabel label={'No results found for this'}/>
                        }
                    </Box>
                }
            </Layout>
        </Helmet>
    )
}

const TextLabel = ({label}) => {

    return (
        <Box sx={{
            mt: 10,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box component={"img"} src={Logo}
                 sx={{
                     width: '250px', mb: 5, mt: 5
                 }}
            />
            <Typography gutterBottom variant="h2" component="div"
                        sx={{
                            fontSize: '1.8rem',
                            fontWeight: '700',
                            lineHeight: '28px',
                            letterSpacing: '-.04em',
                            mb: 5,
                        }}>
                {label}
            </Typography>
        </Box>
    )
}

export default Search;