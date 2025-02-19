import * as types from '../constants/ActionType'

export const setCurrentTrack = (track) => {
    return {
        type: types.audio.SET_CURRENT_TRACK,
        payload: {track, isPlaying: true},
    };
}

export const seekTrack = ({currentTime, currentTimePercent}) => {
    return {
        type: types.audio.SEEK_AUDIO,
        payload: {currentTime, currentTimePercent}
    };
}

export const resetSeekTrack = () => {
    return {type: types.audio.SEEK_AUDIO_RESET,};
}

export const playTrack = () => {
    return {type: types.audio.PLAY_TRACK};
}

export const pauseTrack = () => {
    return {type: types.audio.PAUSE_TRACK};
}

export const playPlaylist = ({tracks}) => {
    return {
        type: types.audio.PLAY_PLAYLIST,
        payload: {tracks, isPlaying: true}
    }
}

export const changeCurrentTime = ({currentTimePercent, currentTime}) => {
    return {
        type: types.audio.CHANGE_CURRENT_TIME,
        payload: {currentTimePercent, currentTime},
    };
}

export const setAudio = ({duration, currentTime, currentTimePercent}) => {
    return {
        type: types.audio.SET_AUDIO,
        payload: {duration, currentTime, currentTimePercent},
    };
}

export const changeVolume = ({volume}) => {
    return {
        type: types.audio.CHANGE_VOLUME,
        payload: {volume},
    };
}

export const setRepeat = ({repeat}) => {
    return {
        type: types.audio.SET_REPEAT,
        payload: {repeat}
    }
}