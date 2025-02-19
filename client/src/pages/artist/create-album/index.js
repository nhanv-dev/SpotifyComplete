/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import {Backdrop, Box} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import Index from "../../../components/common/background-color";
import Helmet from "../../../components/common/Helmet";
import ButtonGroupService from "../../../components/artist/button-group-service";
import Header from "../../../components/web/layout/Header";
import Layout from "../../../components/web/layout/Layout";
import './style.scss';
import SpotifyService from "../../../services/SpotifyService";
import TracksSection from '../../../components/artist/sections/TracksSection';
import PopupMediaCard from './PopupMediaCard';
import FirebaseService from '../../../services/FirebaseService';
import CircularProgressWithLabel from '../../../components/web/CircularProgressWithLabel';
import {toast} from "react-toastify";

function CreateAlbum(props) {
    return (
        <Helmet title={"Tạo album"}>
            <ShowingAlbum {...props}/>
        </Helmet>
    )
}

export const ShowingAlbum = (props) => {
    const navigate = useNavigate();
    const {user} = useSelector(state => state);
    const [open, setOpen] = useState(false);
    const [openSong, setOpenSong] = useState(false);
    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);
    const [songs, setSongs] = useState([]);
    const [progressUpload, setProgressUpload] = useState(null);
    const [artists, setArtists] = useState(() => {
        const {_id, name} = user.info;
        return [{_id, name}]
    });

    useEffect(() => {
        setTitle(props.title || title)
        if (props.image) setImage({url: props.image} || image)
        setSongs(props.songs || songs)
        setArtists(props.artists || artists)
    }, [props])

    async function addSong(song) {
        const index = songs.findIndex(item => item._id === song._id)
        if (index !== -1) {
            toast.error('Bài hát đã có trong album')
            return;
        }
        if (props.albumId) {
            SpotifyService.addSongToAlbum(props.albumId, song._id)
                .then(res => {
                    toast.success('Đã thêm bài hát vào album')
                    setSongs(prev => ([...prev, song]))
                })
                .catch(err => {
                    toast.error('Thêm bài hát vào album thất bại')
                })
        } else {
            toast.success('Đã thêm bài hát vào album')
            setSongs(prev => ([...prev, song]))
        }
    }

    function handleUploadImage(e) {
        e.preventDefault();
        if (!e?.target?.files?.length) return;
        const file = e.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        setImage({url: objectUrl, isPreview: true, file});
    }

    function handleAddArtist() {
    }

    async function handleSave() {
        let imageUrl = image?.url, duration = 0, totalTracks = songs.length;
        songs.forEach(song => duration += song.duration)
        if (image.file) {
            await FirebaseService.uploadFile('images', image.file,
                (progress) => setProgressUpload({message: 'Uploading image', progress}),
                (error) => console.log(error),
                (uploadedURL) => imageUrl = uploadedURL
            )
        }
        const album = {
            title, duration, totalTracks, imageUrl,
            artists: artists.map(artist => artist._id),
            songs: songs.map(song => song._id)
        }
        if (props.albumId) {
            SpotifyService.updateAlbum(props.albumId, album)
                .then(res => {
                    toast.success(`Lưu album ${res.data.album.title} thành công`)
                    setProgressUpload(null)
                })
                .catch(err => {
                    toast.error('Lưu album thất bại')
                    setProgressUpload(null)
                })
        } else {
            SpotifyService.createAlbum(album)
                .then(res => {
                    toast.success(`Lưu album ${res.data.album.title} thành công`)
                    setProgressUpload(null)
                    navigate(`/services/album/${res.data.album._id}`)
                })
                .catch(err => {
                    toast.error('Lưu album thất bại')
                    setProgressUpload(null)
                })
        }
    }

    async function removeFromAlbum(songId) {
        if (props?.albumId) {
            SpotifyService.removeSongFromAlbum(props.albumId, songId)
                .then(res => {
                    setSongs(prev => prev.filter(song => song._id !== songId))
                    toast.success('Đã xóa bài hát khỏi album')
                })
                .catch(err => {
                    toast.error('Xảy ra lỗi. Vui lòng thử lại sau')
                })
        } else {
            toast.success('Đã xóa bài hát khỏi album')
            setSongs(prev => prev.filter(song => song._id !== songId))
        }
    }

    async function deleteAlbum() {
        SpotifyService.deleteAlbum(props.albumId)
            .then(res => {
                navigate('/services/artist')
                toast.success('Xóa album thành công')
            })
            .catch(err => {
                toast.error('Xảy ra lỗi. Vui lòng thử lại sau')
            })
    }

    return (
        <Layout>
            <Header>
                <ButtonGroupService/>
            </Header>
            <Index/>
            <Box sx={{p: 3}}>
                <div className="song">
                    <button type={"button"} onClick={() => setOpen(true)} className="button-select-song"
                            style={{
                                backgroundImage: image?.url ? `url(${image?.url})` : 'none'
                            }}>
                        <div className={`icon`} style={{
                            visibility: image?.url ? "hidden" : "visible",
                            opacity: image?.url ? "0" : "100",
                        }}>
                            <LibraryMusicIcon/>
                        </div>
                    </button>
                    <div className={"song__info"}>
                        <button type={"button"} className={"song__info__name"} onClick={() => setOpen(true)}>
                            <Box sx={{
                                fontSize: title?.length > 15 ? '2.5rem' : '5.5rem',
                                fontWeight: '700',
                                letterSpacing: '-0.04em'
                            }}>
                                {title || 'Tên album'}
                            </Box>
                        </button>
                        <div className={"song__info__artist"}>
                            <p className={"song__info__artist__title"}>Nghệ sĩ:</p>
                            <div className={"song__info__artist__names"}>
                                {artists.map(artist => (
                                    <p key={artist._id} className={"song__info__artist__name"}>
                                        {artist.name}
                                    </p>
                                ))}
                                <button type={"button"} onClick={() => setOpen(true)}
                                        className={"song__info__artist__name__select"}>
                                    <AddIcon className={"icon"}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${open ? 'open' : 'hidden'} popup`}>
                    <div className={"popup__header"}>
                        {props.albumId ? <h5>Cập nhật Album</h5> : <h5>Tạo Album</h5>}
                        <button type={"button"} onClick={() => setOpen(false)}>
                            <CloseIcon className={"icon"}/>
                        </button>
                    </div>

                    <div className={"popup__body"}>
                        <label className={"button-select-song"} htmlFor={"image"}
                               style={{backgroundImage: `url(${image?.url})`}}>
                            <input type={"file"} id={"image"} name={"image"} onChange={handleUploadImage}
                                   accept="image/png, image/jpeg"/>
                            <div className={`icon`} style={{
                                visibility: image?.url ? "hidden" : "visible",
                                opacity: image?.url ? "0" : "100",
                            }}>
                                <LibraryMusicIcon/>
                            </div>
                        </label>
                        <div className={"popup__body__song"}>
                            <input type={"text"} className={"popup__body__song__name"} placeholder={"Tên album"}
                                   value={title || ''} onChange={(e) => setTitle(e.target.value)}/>
                            <div className={"popup__body__song__artist"}>
                                <form className={"popup__body__song__artist__search"} onSubmit={handleAddArtist}>
                                    <input type={"text"} placeholder={"Thêm nghệ sĩ khác"}/>
                                    <button type={"submit"}>
                                        <SearchIcon/>
                                    </button>
                                </form>
                                <div className={"popup__body__song__artists"}>
                                    {artists.map(artist => (
                                        <div key={artist._id} className={"popup__body__song__artists__name"}>
                                            {artist.name}
                                            <button>
                                                <RemoveCircleOutlineIcon/>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Box sx={{
                        fontSize: '0.8rem', fontWeight: '600', width: '100%', mt: 2
                    }}>
                        By proceeding, you agree to give Spotify access to the image you choose to upload. Please
                        make sure you have the right to upload the image.
                    </Box>
                </div>
                <Backdrop open={open} type={"button"} onClick={() => {
                    setOpen(false)
                }} sx={{zIndex: 999}}/>
            </Box>
            <Box sx={{px: 3, pt: 3, display: 'flex', alignItems: 'center', gap: '10px'}}>
                <Box component={'button'} type='button' onClick={() => setOpenSong(true)}
                     sx={{
                         background: '#ffffff12', color: 'white',
                         fontSize: '0.9rem', fontWeight: '600', outline: 'none', border: 'none',
                         p: '10px 24px', borderRadius: '5px', cursor: 'pointer',
                     }}
                >
                    Thêm bài hát
                </Box>
                {props?.albumId &&
                    <Box component={'button'} type='button' onClick={() => deleteAlbum()}
                         sx={{
                             background: '#ffffff12', color: 'white',
                             fontSize: '0.9rem', fontWeight: '600', outline: 'none', border: 'none',
                             p: '10px 24px', borderRadius: '5px', cursor: 'pointer',
                         }}
                    >
                        Xóa Album
                    </Box>
                }
                <Box component={'button'} type='button' onClick={handleSave}
                     sx={{
                         background: 'var(--primary-color)', color: 'white',
                         fontSize: '0.9rem', fontWeight: '600', outline: 'none', border: 'none',
                         p: '10px 24px', borderRadius: '5px', cursor: 'pointer',
                     }}
                >
                    Lưu album
                </Box>
            </Box>
            <PopupTracks artist={user?.info} openSong={openSong} setOpenSong={setOpenSong} addSong={addSong}/>
            <Box sx={{px: 3}}>
                <TracksSection items={songs} createdAt={true} removeFromAlbum={removeFromAlbum}/>
            </Box>
            <Backdrop open={!!progressUpload} sx={{zIndex: 1001}}>
                <CircularProgressWithLabel value={progressUpload?.progress || 0} message={progressUpload?.message}/>
            </Backdrop>
        </Layout>
    );
}

const PopupTracks = ({artist, addSong, openSong, setOpenSong}) => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        if (!openSong || !artist) return;
        SpotifyService.getSongByArtistId(artist._id)
            .then(res => {
                setTracks(res.data.songs)
            })
            .catch(err => {
                setTracks([])
                console.log(err);
            })
    }, [openSong])

    return (
        <Box>
            <Backdrop open={openSong} type={"button"} onClick={() => {
                setOpenSong(false)
            }} sx={{zIndex: 999}}/>
            <Box className={`${openSong ? 'open' : 'hidden'} popup`} sx={{
                padding: '16px !important',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                zIndex: 1000,
                width: '600px',
                borderRadius: '8px',
                overflowY: 'hidden'
            }}>
                <Box className={"popup__header"}>
                    <h5>Tạo Album</h5>
                    <button type={"button"} onClick={() => setOpenSong(false)}>
                        <CloseIcon className={"icon"}/>
                    </button>
                </Box>
                <form className={"popup__body__song__artist__search"}>
                    <input type={"text"} placeholder={"Tìm bài hát theo tên, id,..."}/>
                    <button type={"submit"}>
                        <SearchIcon/>
                    </button>
                </form>
                <Box sx={{overflowY: 'auto', maxHeight: '400px', pr: '10px'}} className="scroll-component">
                    {tracks.map((track, i) => (
                        <PopupMediaCard key={track._id} item={{...track, number: i + 1}} addSong={addSong}/>
                    ))}
                </Box>
            </Box>
        </Box>
    )
}

export default CreateAlbum;