import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { Box, List, ListItem, ListItemText } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import SpotifyService from "../../../services/SpotifyService";
import * as ActionType from "../../../redux/constants/ActionType";
const UserPlaylist = () => {
    const dispatch = useDispatch();
    const { user, playlist } = useSelector(state => state);

    useEffect(() => {
        if (!user?.info?._id) return;
        SpotifyService.getPlaylistByUser(user.info._id)
            .then(res => {
                const action = {
                    payload: res.data.playLists,
                    type: ActionType.playlist.GET_PLAYLIST
                }
                dispatch(action)
            })
            .catch(err => {
                console.log(err.response);
            })

    }, [user])

    return (
        <Box className='sidebar__user__playlist'>
            <List sx={{ px: 2 }}>
                {playlist?.map((item, index) => {
                    return (
                        <ListItem key={index} dense className='sidebar__items__link' component={NavLink}
                            to={`/playlist/${item._id}`} exact={'true'}>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}
export default UserPlaylist