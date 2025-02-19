import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {Backdrop, Box, Button, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from 'react-router-dom';
import BackgroundColor from '../../../components/common/background-color';
import Details from "./Details";
import Helmet from '../../../components/common/Helmet';
import Header from '../../../components/web/layout/Header';
import Layout from "../../../components/web/layout/Layout";
import FirebaseService from "../../../services/FirebaseService";
import SpotifyService from "../../../services/SpotifyService";
import TracksSection from "./TracksSection";
import './style.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import * as ActionType from "../../../redux/constants/ActionType";
import CircularProgressWithLabel from '../../../components/web/CircularProgressWithLabel';
import {toast} from "react-toastify";
import {playPlaylist} from "../../../redux/actions/audioActions";

function Playlist() {
    const {id} = useParams();
    const {user} = useSelector(state => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openEdit, setOpenEdit] = useState(false);
    const [songs, setSongs] = useState([]);
    const [info, setInfo] = useState({});
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [progressUpload, setProgressUpload] = useState(null);

    useEffect(() => {
        SpotifyService.getPlaylistById(id)
            .then(res => {
                setName(res.data.playList.name || '')
                setDescription(res.data.playList.desc || '')
                setImage({url: res.data.playList.imageUrl})
                console.log(res)
                setInfo({
                    ...res.data.playList, type: 'playlist'
                })
                setSongs(res.data.playList.songs)
            })
            .catch(err => {
                setInfo({})
                setSongs([])
            })
    }, [id])

    async function handleUploadImage(e) {
        e.preventDefault();
        if (!e?.target?.files?.length) return;
        const file = e.target.files[0];
        const objectUrl = URL.createObjectURL(file);
        setImage({url: objectUrl, isPreview: true, file});
    }

    async function handleSave() {
        let imageUrl = info.imageUrl;
        if (image?.isPreview) {
            await FirebaseService.uploadFile('images', image.file,
                (progress) => {
                    setProgressUpload({message: 'Updating Playlist', progress});

                },
                (error) => {
                    console.log(error)
                },
                (uploadedURL) => {
                    imageUrl = uploadedURL;
                })
        }

        const payload = {
            name,
            description,
            imageUrl,
            user: info.user._id,
            songs: songs.map(song => song._id)
        }

        SpotifyService.editPlaylist(info._id, payload)
            .then((res) => {
                setName(res.data.playList.name || '')
                setDescription(res.data.playList.desc || '')
                setInfo({
                    ...res.data.playList, type: 'playlist'
                })
                setSongs(res.data.playList.songs)
                const action = {
                    payload: res.data.playList,
                    type: ActionType.playlist.UPDATE_PLAYLIST
                }
                dispatch(action);
                toast.success('Cập nhật playlist thành công')
                setOpenEdit(false);
                setProgressUpload(null);
            })
            .catch(err => {
                toast.error('Chỉnh sửa playlist thất bại')
                setOpenEdit(false)
                setProgressUpload(null)
            });
    }

    async function handleDeletePlaylist() {
        SpotifyService.deletePlaylist(info._id)
            .then(res => {
                navigate("/home");
                const action = {payload: {_id: info._id}, type: ActionType.playlist.DELETE_PLAYLIST}
                dispatch(action)
            })
            .catch(err => {
                console.log(err);
            })
    }

    async function handleRemoveFromPlaylist(songId) {
        SpotifyService.removeSongFromPlaylist({playListId: info._id, songId})
            .then(res => {
                if (res.status === 200) {
                    setSongs(prev => prev.filter(song => song._id !== songId))
                    toast.success("Đã xóa bài hát khỏi album")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    function handlePlay() {
        dispatch(playPlaylist({tracks: songs}))
    }

    return (
        <Helmet title={info.name} style={{position: 'relative'}}>
            <Layout>
                <Header/>
                <BackgroundColor/>
                <Box sx={{p: 3}}>
                    <Details info={{...info}} open={setOpenEdit}/>
                    {user?.info?._id === info?.user?._id &&
                        <>
                            <Backdrop open={!!progressUpload} sx={{zIndex: 1001}}>
                                <CircularProgressWithLabel value={progressUpload?.progress || 0}
                                                           message={progressUpload?.message}/>
                            </Backdrop>
                            <Backdrop open={openEdit} type={"button"} onClick={() => setOpenEdit(false)}
                                      sx={{zIndex: 999}}/>

                            <div className={`${openEdit ? 'open' : 'hidden'} popup`}>
                                <div className={"popup__header"}>
                                    <h5>Edit details</h5>
                                    <button type={"button"} onClick={() => setOpenEdit(false)}>
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
                                        <input type={"text"} className={"popup__body__song__name"}
                                               placeholder={"Tên bài hát"}
                                               value={name} onChange={(e) => setName(e.target.value)}/>
                                        <Box component={'textarea'} className={"text-area-desc-playlist"} sx={{
                                            py: '5px', height: '125px', resize: 'none', width: '100%',
                                        }} placeholder='Mô tả' onChange={(e) => setDescription(e.target.value)}
                                             defaultValue={description}>

                                        </Box>
                                    </div>
                                </div>
                                <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                                    <button type={"button"} className={"button-save"} onClick={handleSave}>
                                        Lưu playlist
                                    </button>
                                </Box>
                                <Box sx={{
                                    fontSize: '0.8rem', fontWeight: '600', width: '100%', mt: 2
                                }}>
                                    By proceeding, you agree to give Spotify access to the image you choose to upload.
                                    Please
                                    make sure you have the right to upload the image.
                                </Box>
                            </div>
                        </>
                    }
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
                             }}
                        >
                            <PlayArrowIcon sx={{fontSize: '2.75rem'}}/>
                        </Box>
                        {user?.info?._id === info?.user?._id &&
                            <Box component={"button"} variant="contained" onClick={handleDeletePlaylist}
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
                                <DeleteIcon/>
                            </Box>
                        }
                    </Box>
                    <Box sx={{my: 5}}>
                        <TracksSection items={songs || []} createdAt={true} hasAlbum={true}
                                       handleRemoveFromPlaylist={handleRemoveFromPlaylist}/>
                    </Box>
                </Box>
            </Layout>
        </Helmet>
    );
}

export default Playlist;


