import { Link } from "react-router-dom";
import { Box, Button } from '@mui/material'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { formatTime } from "../../../utils/changeDuration";
import DefaultAlbumImage from "../../../assets/images/default-artist.jpg";
import DeleteIcon from '@mui/icons-material/Delete';

const Details = ({ info, open }) => {
    return (
        <Box sx={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Box onClick={() => open(true)}
                sx={{
                    width: '230px',
                    height: '230px',
                    position: 'relative',
                    backgroundColor: '#333',
                    boxShadow: '0 4px 60px rgb(0 0 0 / 50%)',
                    borderRadius: info.type === 'artist' ? '50%' : '4px',
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="img"
                    src={info.imageUrl || DefaultAlbumImage}
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: '0',
                        left: '0',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                        borderRadius: info.type === 'artist' ? '50%' : '4px'
                    }}
                />
            </Box>
            <Box sx={{
                maxHeight: '230px',
                height: '230px',
                display: 'flex',
                flexDirection: "column",
                justifyContent: info.title?.length > 20 ? "flex-end" : "space-between",
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
                    {info.type}
                </Box>
                <Box onClick={() => open(true)} sx={{
                    fontSize: info.title?.length > 15 ? '2.5rem' : '5.5rem',
                    fontWeight: '700',
                    letterSpacing: '-0.04em'
                }}>
                    {info.title || info.name}
                </Box>
                <Box sx={{ color: 'white', fontWeight: '500', fontSize: '.9rem', }}>
                    {info.desc && <Box mb={1}>{info.desc}</Box>}
                    {info.duration &&
                        <Box component="span" sx={{ color: '#b3b3b3' }}>
                            {formatTime(info.duration)}
                        </Box>
                    }
                    <Box component="span" sx={{ display: 'inline-block' }}>
                        {info.totalTracks &&
                            <Box component="span">
                                <FiberManualRecordIcon sx={{ fontSize: '8px', mx: '4px' }} /> {info.totalTracks} bài hát
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Details;