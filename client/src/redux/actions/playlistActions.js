import * as types from '../constants/ActionType'
import SpotifyService from '../../services/SpotifyService';

export const createPlaylist = async (payload) => {
    const action = { type: types.playlist.CREATE_PLAYLIST };
    await SpotifyService.createPlaylist(payload)
        .then(res => {
            console.log(res);
            action.payload = res.data.playList;
            action.type = types.playlist.CREATE_PLAYLIST;
        })
        .catch(err => {
            console.log(err);
            action.err = err.response;
            action.type = types.playlist.CREATE_PLAYLIST_FAILED;
        })
    return { ...action }
}

