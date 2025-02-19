import React, {useRef} from 'react';
import {Box, IconButton, Slider} from "@mui/material";
import {PlayCircle, Repeat, Replay, SkipNext, SkipPrevious} from "@mui/icons-material";
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import {useDispatch, useSelector} from "react-redux";
import {pauseTrack, playTrack, seekTrack, setRepeat} from "../../../redux/actions/audioActions";
import {formatTime} from "../../../utils/changeDuration";
import * as types from "../../../redux/constants/ActionType";
import RepeatIcon from '@mui/icons-material/Repeat';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import ShuffleIcon from '@mui/icons-material/Shuffle';

function PlayBack() {
    const {audio} = useSelector(state => state);
    const dispatch = useDispatch();
    const progressRef = useRef();

    function handleChangeProgress(e) {
        if (!audio?.duration) return;
        const currentTimePercent = e.target.value;
        const currentTime = currentTimePercent * audio.duration / 100;
        dispatch(seekTrack({currentTime, currentTimePercent}))
    }

    function handleChange() {
        if (!audio.currentTrack) return;
        if (audio.isPlaying) {
            const action = pauseTrack()
            dispatch(action)
        } else {
            const action = playTrack();
            dispatch(action)
        }
    }

    function handleSetRepeat() {
        if (!audio.repeat)
            dispatch(setRepeat({repeat: types.audio.REPEAT_PLAYLIST}))
        else if (audio.repeat === types.audio.REPEAT_PLAYLIST)
            dispatch(setRepeat({repeat: types.audio.REPEAT_TRACK}))
        else if (audio.repeat === types.audio.REPEAT_TRACK)
            dispatch(setRepeat({repeat: null}))
    }

    return (
        <Box sx={{height: '100%', maxHeight: '100%'}}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 1.5,
                maxHeight: '50px',
            }}>
                <Box sx={{mt: 0.75}}>
                    <IconButton sx={{color: '#b3b3b3'}} component="button">
                        <ShuffleIcon sx={{fontSize: '22px'}}/>
                    </IconButton>
                    <IconButton sx={{color: '#b3b3b3'}} component="button">
                        <SkipPrevious sx={{fontSize: '22px'}}/>
                    </IconButton>
                    <IconButton sx={{color: '#fff'}} className='button--play' component="button" onClick={handleChange}>
                        {audio.isPlaying ?
                            <PauseCircleIcon sx={{fontSize: '2.25rem'}}/> :
                            <PlayCircle sx={{fontSize: '2.25rem'}}/>
                        }
                    </IconButton>
                    <IconButton sx={{color: '#b3b3b3'}} component="button">
                        <SkipNext sx={{fontSize: '22px'}}/>
                    </IconButton>
                    <IconButton sx={{color: '#b3b3b3'}} component="button" onClick={handleSetRepeat}>
                        {audio?.repeat === types.audio.REPEAT_TRACK &&
                            <RepeatOneIcon sx={{
                                fontSize: '22px',
                                color: 'var(--primary-color)',
                                '&:hover': {color: 'var(--primary-color)'}
                            }}/>
                        }
                        {audio?.repeat === types.audio.REPEAT_PLAYLIST &&
                            <RepeatIcon sx={{
                                fontSize: '22px',
                                color: 'var(--primary-color)',
                                '&:hover': {color: 'var(--primary-color)'}
                            }}/>
                        }
                        {!audio?.repeat &&
                            <RepeatIcon sx={{fontSize: '22px'}}/>
                        }
                    </IconButton>
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1.5rem',
                alignItems: 'center',
                mb: 1
            }}>
                <Box sx={{
                    color: '#b3b3b3',
                    fontSize: '.8rem',
                    fontWeight: '600',
                    letterSpacing: '.8px'
                }}>
                    {audio.currentTime ? formatTime(audio.currentTime) : '0:00'}
                </Box>
                <Slider
                    ref={progressRef}
                    size="small"
                    value={audio?.currentTimePercent || 0}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    onChange={handleChangeProgress}
                    sx={{color: '#b3b3b3', flex: '1'}}

                />
                <Box sx={{
                    color: '#b3b3b3',
                    fontSize: '.8rem',
                    fontWeight: '600',
                    letterSpacing: '.8px'
                }}>
                    {audio.duration ? formatTime(audio.duration) : '0:00'}
                </Box>
            </Box>

        </Box>
    );
}

export default PlayBack;