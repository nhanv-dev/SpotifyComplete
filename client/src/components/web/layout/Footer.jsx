import {
    AirplaySharp, QueueMusicSharp,
    VolumeDown, VolumeMute, VolumeOff,
    VolumeUp
} from '@mui/icons-material/';
import { Box, Grid, IconButton, Slider } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeVolume } from "../../../redux/actions/audioActions";
import PlayBack from "../Player";

const Footer = () => {
    const {audio} = useSelector(state => state);
    const dispatch = useDispatch();

    function handleChangeVolume(e) {
        e.preventDefault();
        dispatch(changeVolume({volume: e.target.value}))
    }

    return (
        <Grid container sx={{px: 2}} alignItems='center' className='footer'>
            <Grid item sm={4}>
                {audio?.currentTrack ?
                    <Box sx={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                        <Box
                            component="div"
                            sx={{
                                width: '56px',
                                height: '56px',
                                minWidth: '56px',
                                minHeight: '56px',
                                position: 'relative',
                                backgroundColor: '#333',
                                boxShadow: '0 4px 60px rgb(0 0 0 / 50%)',
                                borderRadius: '4px',
                                overflow: 'hidden',
                            }}
                        >
                            <Box
                                component="img"
                                src={audio.currentTrack.imageUrl}
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
                        <Box sx={{}}>
                            <Box component={Link} to={`/track/${audio.currentTrack._id}`}
                                 sx={{
                                     fontWeight: '600',
                                     textDecoration: 'none',
                                     fontSize: '0.9rem',
                                     color: 'white',
                                     mb: 1,
                                     display: 'block',
                                     maxWidth: '300px',
                                     whiteSpace: 'nowrap',
                                     overflow: 'hidden',
                                     textOverflow: 'ellipsis',
                                     transition: 'all .15s ease-in-out',
                                     '&:hover': {
                                         textDecoration: 'underline',
                                     }
                                 }}>
                                {audio.currentTrack.title}
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                {audio.currentTrack.artists.map((artist, i) => (
                                    <Box key={i} component={Link} to={`/artist/${artist._id}`} sx={{
                                        fontWeight: '500',
                                        textDecoration: 'none',
                                        fontSize: '0.8rem',
                                        color: '#b3b3b3',
                                        display: 'block',
                                        maxWidth: '300px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        transition: 'all .15s ease-in-out',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        }
                                    }}>
                                        {artist.name}
                                        {i < audio.currentTrack.artists.length - 1 && ', '}
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Box> :
                    <div>

                    </div>
                }
            </Grid>
            <Grid item sm={4}>
                <PlayBack/>
            </Grid>
            <Grid item sm={4}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'end'
                }}>
                    <IconButton sx={{color: '#b3b3b3'}} component="button">
                        <QueueMusicSharp/>
                    </IconButton>
                    <IconButton sx={{color: '#b3b3b3'}} component="button">
                        <AirplaySharp/>
                    </IconButton>
                    <IconButton sx={{color: '#b3b3b3'}} component="button">
                        {<Volume volume={audio?.volume}/>}
                    </IconButton>
                    <Box width={70} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end'
                    }}>
                        <Slider
                            size="small"
                            value={audio?.volume} max={100}
                            aria-label="Volume"
                            valueLabelDisplay="auto"
                            onChange={handleChangeVolume}
                            sx={{color: '#b3b3b3'}}
                        />
                    </Box>
                </Box>
            </Grid>
        </Grid>

    )
}

export default Footer;

const Volume = (props) => {
    let {volume} = props
    if (volume >= 80) return <VolumeUp sx={{transition: 'all .3s ease'}}/>
    if (volume >= 50) return <VolumeDown sx={{transition: 'all .3s ease'}}/>
    if (volume >= 0) return <VolumeMute sx={{transition: 'all .3s ease'}}/>
    return <VolumeOff sx={{transition: 'all .3s ease'}}/>

}