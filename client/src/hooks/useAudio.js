import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeCurrentTime, pauseTrack, resetSeekTrack, setAudio, setCurrentTrack} from "../redux/actions/audioActions";
import * as types from "../redux/constants/ActionType";

const useAudio = () => {
    const audioState = useSelector(state => state.audio);
    const dispatch = useDispatch();
    const [audio] = useState(new Audio());

    const setTrack = (track) => {
        audio.src = track.songSrc;
        audioState.isPlaying ? audio.play() : audio.pause();
        dispatch(setAudio({duration: track.duration, currentTime: 0, currentTimePercent: 0}))
    }

    const setCurrentTime = (e) => {
        const currentTime = e.target.currentTime;
        const currentTimePercent = Math.round(currentTime * 100 / audio.duration);
        dispatch(changeCurrentTime({currentTimePercent, currentTime}))
    }

    useEffect(() => {
        if (!audioState?.seeking) return;
        audio.currentTime = audioState.currentTime;
        dispatch(resetSeekTrack())
    }, [audioState?.seeking])

    useEffect(() => {
        if (!audioState?.currentTrack) return;
        setTrack(audioState.currentTrack)
    }, [audioState?.currentTrack])

    useEffect(() => {
        if (!audioState?.tracks || audioState?.tracks?.length <= 0) return;
        dispatch(setCurrentTrack(audioState?.tracks[0]))
    }, [audioState?.tracks])

    useEffect(() => {
        audioState.isPlaying ? audio.play() : audio.pause();
    }, [audioState?.isPlaying]);

    useEffect(() => {
        if (audioState?.volume) {
            const volume = audioState?.volume > 5 ? audioState?.volume / 100 : 0;
            audio.volume = volume;
            audio.muted = volume === 0;
        }
    }, [audioState?.volume]);


    useEffect(() => {
        audio.addEventListener('timeupdate', setCurrentTime);
        return () => {
            audio.removeEventListener('timeupdate', setCurrentTime);
        };
    }, [audioState]);

    useEffect(() => {
        const nextTrack = () => {
            if (!audioState.tracks) return null;
            const position = audioState.tracks.findIndex(track => track._id === audioState.currentTrack._id);
            if (position + 1 >= audioState.tracks.length) return audioState.tracks[0]
            return audioState.tracks[position + 1]
        }

        const listenerEnded = () => {
            if (!audioState.repeat) {
                dispatch(pauseTrack())
                audio.removeEventListener('timeupdate', setCurrentTime);
            } else if (audioState.repeat === types.audio.REPEAT_PLAYLIST) {
                if (!audioState.tracks || audioState?.tracks.length <= 0) {
                    audio.removeEventListener('timeupdate', setCurrentTime);
                    return dispatch(pauseTrack());
                }
                const track = nextTrack();
                dispatch(setCurrentTrack(track))
            }
        }

        audio.loop = audioState.repeat === types.audio.REPEAT_TRACK
        audio.addEventListener('ended', () => {
            listenerEnded()
        });
        return () => {
            audio.removeEventListener('ended', listenerEnded);
        };
    }, [audioState.repeat, audioState.tracks, audioState.currentTrack])

    return [setTrack];
};
export default useAudio;