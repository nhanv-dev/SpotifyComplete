import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import {Box, Button, Menu, MenuItem} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {setCurrentTrack} from "../../../redux/actions/audioActions";
import {formatTime} from "../../../utils/changeDuration";
import {formatMediumTime} from "../../../utils/formatTime";
import SpotifyService from "../../../services/SpotifyService";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {toast} from "react-toastify";
import * as ActionType from "../../../redux/constants/ActionType";
import {createPlaylist} from "../../../redux/actions/playlistActions";

function MediaCard({item, handleLikeSong}) {
    const {audio, playlist, user} = useSelector(state => state);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isPlaying, setIsPlaying] = useState(() => {
        return audio?.currentTrack?._id === item._id
    });

    useEffect(() => {
        setIsPlaying(audio?.currentTrack?._id === item._id)
    }, [audio?.currentTrack])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function playTrack() {
        if (audio?.currentTrack?._id === item._id) return;
        const action = setCurrentTrack({...item, isPlaying: true});
        dispatch(action);
    }

    function handleAddSongToPlaylist(playListId) {
        SpotifyService.addSongToPlaylist({playListId, songId: item._id})
            .then(res => {
                toast.success('Đã thêm bài hát vào playlist')
            })
            .catch(err => {
                if (err?.response?.data?.message === 'Song already added to playlist')
                    toast.info('Bài hát đã có trong playlist')
            })
    }

    async function handleCreatePlaylist() {
        const payload = {
            name: `My Playlist #${playlist.length + 1}`,
            user: user.info._id,
            songs: []
        }
        const action = await createPlaylist(payload);
        if (action.type === ActionType.playlist.CREATE_PLAYLIST) {
            dispatch(action);
            toast.success('Tạo playlist thành công')
        } else {
            toast.error('Tạo playlist thất bại')
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            height: '56px',
            padding: '0 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'all 0s',
            '&:hover': {
                background: 'rgba(255,255,255,.3)',
                transition: 'all 0.3s',
            },
            '&:hover svg': {
                visibility: 'visible',
                opacity: '1',
                display: 'inline-block',
            },
            '&:hover .item-index': {
                visibility: 'hidden',
                opacity: '0',
                display: 'none',
            }
        }}>
            {item.number &&
                <Box
                    component="div"
                    sx={{
                        color: '#b3b3b3',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px'
                    }}>
                    <PlayArrowRoundedIcon onClick={playTrack} sx={{
                        visibility: 'hidden',
                        display: 'none',
                        opacity: '0',
                        width: '100%',
                    }}/>
                    {isPlaying && audio?.isPlaying ?
                        <Box className='item-index'
                             sx={{width: '100%', textAlign: 'center'}}>
                            <Box component={"img"} sx={{
                                width: '16px', height: '16px'
                            }}
                                 src={'https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif'}
                                 alt={"equalizer"}/>
                        </Box> :
                        <Box className='item-index'
                             sx={{width: '100%', textAlign: 'center'}}>
                            {item.number}
                        </Box>
                    }
                </Box>
            }
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: '0.75rem',
                width: '35%',
            }}>
                <Box
                    component="div"
                    sx={{
                        width: '40px',
                        height: '40px',
                        position: 'relative',
                        backgroundColor: '#333',
                        boxShadow: '0 4px 60px rgb(0 0 0 / 50%)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                    }}
                >
                    <Box
                        component="img"
                        src={item.imageUrl}
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: '0',
                            left: '0',
                            objectFit: 'cover',
                            objectPosition: 'center center',
                            borderRadius: '4px'
                        }}
                    />
                </Box>
                <Box sx={{
                    fontSize: '1rem', lineHeight: '1.5rem', letterSpacing: 'normal', fontWeight: '500', flex: 1
                }}>
                    <Box onClick={playTrack} sx={{
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: item.style === 'detail' ? '600px' : '350px',
                        '&:hover': {
                            color: 'var(--primary-color)'
                        }
                    }}>
                        {item?.title}
                    </Box>
                    <Box component="div" sx={{
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '350px'
                    }}>
                        {item?.artists?.length < 10 ? item?.artists?.map((artist, index) => {
                                return (
                                    <Box key={index} component={Link} to={`/artist/${artist._id}`}
                                         sx={{
                                             fontSize: '.8rem',
                                             lineHeight: '1.5rem',
                                             height: '1.5rem',
                                             color: '#b3b3b3',
                                             textDecoration: 'none',
                                             transition: 'all .2s',
                                             zIndex: 1,
                                             '&:hover': {
                                                 textDecoration: 'underline',
                                                 color: 'white'
                                             }
                                         }}>{index < item.artists.length - 1 ? `${artist.name}, ` : artist.name}</Box>)
                            }) :
                            <Box sx={{
                                fontSize: '.8rem',
                                lineHeight: '1.5rem',
                                color: '#b3b3b3',
                                textDecoration: 'none',
                            }}>
                                Various artists
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
            <Box
                component={Link}
                to={`/album/${item.album?.id}`}
                sx={{
                    textAlign: 'left',
                    width: '30%',
                    fontSize: '.9rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    color: '#b3b3b3',
                    transition: 'all .25s',
                    '&:hover': {
                        color: 'white', textDecoration: 'underline',
                    }
                }}
            >
                {item.album?.name}
            </Box>
            <Box
                sx={{
                    textAlign: 'left',
                    flex: 1,
                    fontSize: '.9rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    color: '#b3b3b3',
                    transition: 'all .25s',
                    '&:hover': {
                        color: 'white', textDecoration: 'underline',
                    }
                }}
            >
                {item.createdAt && formatMediumTime(item.createdAt)}
            </Box>
            <Box sx={{
                fontWeight: '500',
                color: '#b3b3b3',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '110px'
            }}>
                <FavoriteBorderOutlinedIcon
                    onClick={() => handleLikeSong(item._id)}
                    sx={{
                        fontSize: '1.2rem',
                        visibility: 'hidden',
                        opacity: '0',
                        transition: 'all 0s'
                    }}/>
                <Box sx={{
                    fontWeight: '500',

                }}>
                    {item.duration && formatTime(item.duration)}
                </Box>
                <Box sx={{
                    position: 'relative'
                }}>
                    <MoreHorizIcon
                        id="song-options-button-dsa"
                        aria-haspopup="true"
                        aria-controls={open ? 'song-options' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{
                            fontSize: '1.2rem',
                            visibility: 'hidden',
                            opacity: '0',
                            transition: 'all 0s'
                        }}
                    />
                    <Menu
                        id="song-options"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'song-options-button-dsa',
                        }}
                        sx={{
                            overflow: 'visible',
                            mt: 1,
                            '.MuiMenu-paper': {
                                transform: 'translate(-50px,-100%) !important',
                                borderRadius: '5px',
                                background: 'transparent', overflow: 'visible'
                            },
                            '& ul': {
                                backgroundColor: '#282828',
                                color: '#fff',
                                boxShadow: '0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%)',
                                maxHeight: 'calc(100vh - 24px)',
                                maxWidth: '350px',
                                minWidth: '160px',
                                padding: '5px',
                                '& li': {
                                    fontSize: '.8rem',
                                    fontWeight: '500',
                                    letterSpacing: '.5px',
                                    py: '8px',
                                    px: '5px',
                                    borderRadius: '5px',
                                    transition: 'all .15s ease-in-out',
                                    backgroundColor: '#282828 !important',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,.1) !important',
                                    }
                                }
                            }
                        }}
                    >
                        <MenuItem>
                            Go to song radio
                        </MenuItem>
                        <MenuItem>
                            Go to artist
                        </MenuItem>
                        <MenuItem>
                            Go to album
                        </MenuItem>
                        <MenuItem>
                            Show credits
                        </MenuItem>
                        <MenuItem
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                '&:hover .playlist': {
                                    display: 'block'
                                }
                            }}>
                            Add to playlist
                            <ArrowRightIcon/>
                            <Box className="playlist" sx={{
                                position: 'absolute',
                                left: '0px',
                                bottom: '0',
                                transform: 'translate(-100%,0)',
                                borderRadius: '5px',
                                display: 'none',
                                transition: '0.3s ease',
                                background: '#282828',
                                padding: '5px',
                                boxShadow: '0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%)',
                                width: '220px',
                                maxHeight: '300px',
                                overflow: 'hidden'

                            }}>
                                <Button sx={{
                                    display: 'block', width: '100%',
                                    color: 'white',
                                    textAlign: 'left',
                                    textTransform: 'none',
                                    fontSize: '.825rem',
                                    fontWeight: '500',
                                    letterSpacing: '.5px',
                                    paddingTop: '8px',
                                    paddingBottom: '8px',
                                    borderRadius: '5px',
                                    transition: 'all .15s ease-in-out',
                                    borderBottom: '1px solid hsla(0,0%,100%,.1)',
                                    mb: '5px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255,255,255,.1)',
                                    }

                                }} onClick={handleCreatePlaylist}>
                                    Create playlist
                                </Button>
                                <Box sx={{width: '100%', overflowY: 'auto', height: '200px', display: 'block'}}
                                     className="scroll-component">
                                    {playlist.map(item => (
                                        <Button key={item._id}
                                                sx={{
                                                    display: 'block', width: '100%',
                                                    color: 'white',
                                                    textAlign: 'left',
                                                    textTransform: 'none',
                                                    fontSize: '.825rem',
                                                    fontWeight: '500',
                                                    letterSpacing: '.5px',
                                                    paddingTop: '8px',
                                                    paddingBottom: '8px',
                                                    borderRadius: '5px',
                                                    transition: 'all .15s ease-in-out',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255,255,255,.1)',
                                                    }

                                                }}
                                                onClick={() => handleAddSongToPlaylist(item._id)}>
                                            {item.name}
                                        </Button>
                                    ))}
                                </Box>

                            </Box>
                        </MenuItem>
                        <MenuItem>
                            Share
                        </MenuItem>
                        <MenuItem>
                            Open in Desktop app
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>
        </Box>
    );
}

export default MediaCard;