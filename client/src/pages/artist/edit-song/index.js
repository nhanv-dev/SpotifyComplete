import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import {Backdrop} from "@mui/material";
import Box from "@mui/material/Box";
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import Index from "../../../components/common/background-color";
import Helmet from "../../../components/common/Helmet";
import CircularProgressWithLabel from "../../../components/web/CircularProgressWithLabel";
import Header from "../../../components/web/layout/Header";
import Layout from "../../../components/web/layout/Layout";
import FirebaseService from "../../../services/FirebaseService";
import SpotifyService from "../../../services/SpotifyService";
import * as config from "../../../config/routes";
import './style.scss';
import ButtonGroupService from '../../../components/artist/button-group-service';

function UploadSong() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {user} = useSelector(state => state);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);
    const [song, setSong] = useState(null);
    const [progressUploadSong, setProgressUploadSong] = useState(null);
    const audioRef = useRef(null);
    const audioPreviewRef = useRef(null);
    const audioSrcRef = useRef(null);
    const [artists, setArtists] = useState(() => {
        const {_id, name} = user.info;
        return [{_id, name}]
    });

    useEffect(() => {
        SpotifyService.getSongById(id)
            .then(res => {
                const {song} = res.data;
                setSong({url: song.songSrc})
                setTitle(song.title)
                setImage({url: song.imageUrl})
                audioSrcRef.current.setAttribute('src', song.songSrc);
                audioRef.current.load();
                audioPreviewRef.current.src = song.songSrc;
                audioPreviewRef.current.load();
            })
            .catch(err => {
            })
    }, [id])

    useEffect(() => {
        if (!open && song?.url && audioRef?.current && audioPreviewRef?.current) {
            audioRef.current.pause();
            audioPreviewRef.current.currentTime = audioRef.current.currentTime;
        }
    }, [open])

    async function handleUploadImage(e) {
        e.preventDefault();
        if (!e?.target?.files?.length) return;
        const file = e.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        setImage({url: objectUrl, isPreview: true, file});
    }

    async function handleUploadSong(e) {
        e.preventDefault();
        if (!e?.target?.files?.length) return;
        const file = e.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        setSong({url: objectUrl, isPreview: true, file});
        audioSrcRef.current.setAttribute('src', objectUrl);
        audioRef.current.load();
        audioPreviewRef.current.src = objectUrl;
        audioPreviewRef.current.load();
    }

    async function handleAddArtist(e) {
        e.preventDefault();
    }

    async function handleSave() {
        let uploadedImage = song?.imageUrl, uploadedSong = song?.songSrc;
        if (image?.file) {
            await FirebaseService.uploadFile('images', image.file,
                (progress) => {
                    setProgressUploadSong({message: 'Uploading image', progress});
                },
                (error) => {
                    console.log(error)
                },
                (uploadedURL) => {
                    uploadedImage = uploadedURL;
                })
        }
        if (song?.file) {
            await FirebaseService.uploadFile('tracks', song.file,
                (progress) => {
                    setProgressUploadSong({message: 'Uploading track', progress});
                },
                (error) => {
                    console.log(error)
                },
                (uploadedURL) => {
                    uploadedSong = uploadedURL;
                })
        }
        const track = {
            _id: id,
            title,
            artists: artists.map(artist => artist._id),
            imageUrl: uploadedImage,
            songSrc: uploadedSong,
            duration: audioRef.current.duration
        }
        SpotifyService.updateTrack(track)
            .then((res) => {
                navigate(`/services${config.serviceArtist}`);
            })
            .catch(err => {
                console.log(err.response);
                setOpen(false)
                setProgressUploadSong(null);
            });
    }

    return (
        <Helmet title="Thông tin bài hát" style={{position: 'relative'}}>
            <Layout>
                <Header>
                    <ButtonGroupService/>
                </Header>
                <Index/>
                <Box sx={{p: 3}}>
                    <div className="song">
                        <button type={"button"} className={"button-select-song"} onClick={() => setOpen(true)}
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
                            <button type={"button"} onClick={() => setOpen(true)} className={"song__info__name"}>
                                <Box sx={{
                                    fontSize: title?.length > 15 ? '2rem' : '2.5rem',
                                    fontWeight: '700',
                                    letterSpacing: '-0.04em'
                                }}>
                                    {title || 'Tên bài hát'}
                                </Box>
                            </button>
                            <Box sx={{mt: 3, mb: 3, width: '400px', 'audio': {width: '100%', height: '46px'}}}>
                                <audio ref={audioPreviewRef} controls>
                                    <source src={song?.url}/>
                                </audio>
                            </Box>
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
                            <h5>Upload Track</h5>
                            <button type={"button"} onClick={() => setOpen(false)}>
                                <CloseIcon className={"icon"}/>
                            </button>
                        </div>
                        <div className={"popup__song__file"}>
                            <label htmlFor={"song"}>
                                <FileUploadIcon/>
                                Upload bài hát
                            </label>
                            <audio ref={audioRef} controls>
                                <source src={song?.url} ref={audioSrcRef}/>
                            </audio>
                            <input type={"file"} id={"song"} name={"song"} onChange={handleUploadSong}
                                   accept="audio/mp3,audio/*;capture=microphone"/>
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
                                <input type={"text"} className={"popup__body__song__name"} placeholder={"Tên bài hát"}
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
                        <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                            <button type={"button"} className={"button-save"} onClick={handleSave}>
                                Lưu bài hát
                            </button>
                        </Box>
                        <Box sx={{
                            fontSize: '0.8rem', fontWeight: '600', width: '100%', mt: 2
                        }}>
                            By proceeding, you agree to give Spotify access to the image you choose to upload. Please
                            make sure you have the right to upload the image.
                        </Box>
                    </div>
                    <Backdrop open={!!progressUploadSong} sx={{zIndex: 1001}}>
                        <CircularProgressWithLabel value={progressUploadSong?.progress || 0}
                                                   message={progressUploadSong?.message}/>
                    </Backdrop>
                    <Backdrop open={open} type={"button"} onClick={() => setOpen(false)} sx={{zIndex: 999}}/>
                </Box>
            </Layout>
        </Helmet>
    );
}

export default UploadSong;