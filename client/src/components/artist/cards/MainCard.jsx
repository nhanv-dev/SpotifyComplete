import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Box, Card, CardActionArea, CardContent, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { setCurrentTrack } from "../../../redux/actions/audioActions";

export default function MainCard({item, type}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id, title, artists, desc, imageUrl, songSrc} = item;


    function handlePlayTrack() {
        if (type === 'track') {
            dispatch(setCurrentTrack(item));
            navigate(`/${type}/${_id}`);
        }
    }


    return (
        <Card
            sx={{
                backgroundColor: '#181818', color: '#ffffff', height: '100%',
                position: 'relative',
                '&:hover #play-card.button-play-card': {
                    top: 'calc(45% - .8rem)',
                    visibility: 'visible',
                    opacity: '1'
                }
            }}>
            <IconButton id="play-card" className="button-play-card" sx={{top: '45%'}} onClick={handlePlayTrack}>
                <PlayArrowRoundedIcon sx={{fontSize: '40px',}}/>
            </IconButton>
            <CardActionArea
                component={Link} to={`/services/${type}/${_id}`}
                sx={{zIndex: 0, padding: '16px'}}>
                <Box
                    component="div"
                    sx={{
                        marginBottom: '16px',
                        width: '100%',
                        position: 'relative',
                        paddingBottom: '100%',
                        backgroundColor: '#333',
                        boxShadow: '0 8px 24px rgb(0 0 0 / 50%)',
                        borderRadius: type === 'artist' ? '50%' : '4px',
                        overflow: 'hidden',
                    }}>
                    <Box
                        component="img"
                        src={imageUrl || 'https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg'}
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            top: '0',
                            left: '0',
                            objectFit: 'cover',
                            objectPosition: 'center center',
                            borderRadius: type === 'artist' ? '50%' : '4px'
                        }}
                    />
                </Box>
                <CardContent sx={{padding: '0'}}>
                    <Typography gutterBottom component="div" sx={{
                        fontSize: '16px',
                        fontWeight: '700',
                        lineHeight: '24px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {title}
                    </Typography>
                    <Typography sx={{
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        lineHeight: '20px',
                        height: '40px',
                        color: '#b3b3b3',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        display: '-webkit-box',
                        marginTop: '4px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}>
                        {desc || artists?.map(a => a.name)}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
