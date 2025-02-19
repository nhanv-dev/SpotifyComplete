import React from 'react';
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AppsIcon from '@mui/icons-material/Apps';
import PaymentIcon from '@mui/icons-material/Payment';

function Sidebar() {
    return (
        <Box sx={{width: '100%', pb: 10}}>
            <Box sx={{mx: 'auto', width: '70px', height: '70px', mt: '30px', mb: '20px'}}>
                <AccountCircleIcon sx={{width: '64px', height: '64px', color: '#222326'}}/>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                color: '#919496', cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                borderBottom: '1px solid #00000033',
                borderTop: '1px solid #ffffff0d',
                py: 2, px: 5
            }}>
                <HomeIcon sx={{fontSize: '22px'}}/>
                <Box sx={{position: 'relative', top: '0.5px'}}>Account overview</Box>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                color: '#919496', cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                borderBottom: '1px solid #00000033',
                borderTop: '1px solid #ffffff0d',
                py: 2, px: 5
            }}>
                <EditIcon sx={{fontSize: '22px'}}/>
                <Box sx={{position: 'relative', top: '0.5px'}}>Edit profile</Box>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                color: '#919496', cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                borderBottom: '1px solid #00000033',
                borderTop: '1px solid #ffffff0d',
                py: 2, px: 5
            }}>
                <HttpsIcon sx={{fontSize: '22px'}}/>
                <Box sx={{position: 'relative', top: '0.5px'}}>Change password</Box>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                color: '#919496', cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                borderBottom: '1px solid #00000033',
                borderTop: '1px solid #ffffff0d',
                py: 2, px: 5
            }}>
                <NotificationsIcon sx={{fontSize: '22px'}}/>
                <Box sx={{position: 'relative', top: '0.5px'}}>Notification settings</Box>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                color: '#919496', cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                borderBottom: '1px solid #00000033',
                borderTop: '1px solid #ffffff0d',
                py: 2, px: 5
            }}>
                <HttpsIcon sx={{fontSize: '22px'}}/>
                <Box sx={{position: 'relative', top: '0.5px'}}>Privacy settings</Box>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                color: '#919496', cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                borderBottom: '1px solid #00000033',
                borderTop: '1px solid #ffffff0d',
                py: 2, px: 5
            }}>
                <PaymentIcon sx={{fontSize: '22px'}}/>
                <Box sx={{position: 'relative', top: '0.5px'}}>Saved payment cards</Box>
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                color: '#919496', cursor: 'pointer',
                fontSize: '0.95rem',
                fontWeight: '600',
                borderBottom: '1px solid #00000033',
                borderTop: '1px solid #ffffff0d',
                py: 2, px: 5
            }}>
                <AppsIcon sx={{fontSize: '22px'}}/>
                <Box sx={{position: 'relative', top: '0.5px'}}>Apps</Box>
            </Box>
        </Box>
    );
}

export default Sidebar;