import {Link} from "react-router-dom";
import {Box} from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {formatTime} from "../../../utils/changeDuration";
import DefaultAlbumImage from "../../../assets/images/default-artist.jpg";

const Details = ({duration, totalTracks}) => {

    return (
        <Box sx={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
            <Box
                component="div"
                sx={{
                    width: '230px',
                    height: '230px',
                    position: 'relative',
                    backgroundColor: '#333',
                    boxShadow: '0 4px 60px rgb(0 0 0 / 50%)',
                    borderRadius: '50%',
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="img"
                    src={DefaultAlbumImage}
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: '0',
                        left: '0',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        borderRadius: '50%'
                    }}
                />
            </Box>
            <Box sx={{
                maxHeight: '230px',
                height: '230px',
                display: 'flex',
                flexDirection: "column",
                justifyContent: "flex-end",
                flexWrap: "nowrap",
                gap: '2.5rem'
            }}>
                <Box mt={1}
                     sx={{
                         fontSize: '.9rem',
                         fontWeight: '600',
                         textTransform: 'uppercase',
                         display: 'flex', alignItems: 'center'
                     }}>
                    Playlist
                </Box>
                <Box sx={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    letterSpacing: '-0.04em'
                }}>
                    List nhạc yêu thích của bạn
                </Box>
                <Box sx={{color: 'white', fontWeight: '500', fontSize: '.9rem',}}>
                    <Box component="span" sx={{color: '#b3b3b3'}}>
                        {formatTime(duration || 0)}
                    </Box>
                    {totalTracks > 0 &&
                        <Box component="span" sx={{display: 'inline-block'}}>
                            <Box component="span">
                                <FiberManualRecordIcon sx={{fontSize: '8px', mx: '4px'}}/> {totalTracks || 0} bài
                                hát
                            </Box>
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default Details;