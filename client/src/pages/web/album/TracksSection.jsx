import MediaCard from './MediaCard'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import { Box } from '@mui/material'

const TracksSection = ({ items, hasAlbum, createdAt }) => {

    return (
        <Box component='div' mt={2}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '16px',
                    marginBottom: '16px',
                    gap: '1rem',
                    fontSize: '1rem',
                    color: '#b3b3b3',
                    fontWeight: '500',
                    borderBottom: '1px solid rgba(255,255,255,.1)'
                }}>
                <Box sx={{ width: '24px', textAlign: 'center' }}>
                    #
                </Box>
                <Box sx={{ width: '35%' }}>
                    Tiêu đề
                </Box>
                <Box sx={{ width: '30%' }}>
                    {hasAlbum && 'Album'}
                </Box>
                <Box sx={{ flex: '1' }}>
                    {createdAt && 'Thêm vào ngày'}
                </Box>
                <Box sx={{ fontSize: '1rem', width: '110px', textAlign: 'center' }}>
                    <AccessTimeRoundedIcon />
                </Box>
            </Box>
            {(!items || items?.length <= 0) &&
                <Box sx={{ textAlign: 'center', fontWeight: '500', py: 3 }}>
                    Không có bài hát nào.
                </Box>
            }
            {items?.length > 0 &&
                <div>
                    {items.map((item, i) => {
                        return <MediaCard key={item._id} item={{ ...item, number: i + 1 }} />
                    })}
                </div>
            }
        </Box>
    );
};

export default TracksSection;