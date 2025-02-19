import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { Box, CircularProgress } from '@mui/material';
import UserRouter from "./UserRouter";
import ArtistRouter from "./ArtistRouter";

const Router = () => {
    return (
        <React.Suspense fallback={<Spinner />}>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" exact={true} element={<UserRouter />} />
                    <Route path="/services/*" exact={true} element={<ArtistRouter />} />
                </Routes>
            </BrowserRouter>
        </React.Suspense>
    )
}

export const Spinner = () => {
    return (
        <Box sx={{
            position: 'fixed',
            top: '0', left: '0',
            bottom: '0', right: '0',
            backgroundColor: '#000'
        }}>
            <Box sx={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5rem',
            }}>
                <Box component="img"
                    src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png'
                    alt='Logo SpotifyService'
                    className="logo"
                    sx={{ maxWidth: '380px', display: 'block' }} />
                <CircularProgress sx={{ color: 'var(--primary-color)' }} />
            </Box>
        </Box>
    )
}

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{
            display: "flex", alignItems: "center", justifyItems: 'center', gap: '30px', flexDirection: 'column',
            width: '100vw', height: '100vh', mt: '30px'
        }}>
            <Box component={"img"}
                src={"https://1.bp.blogspot.com/-W_8l-L7BARo/Xs0wlcD8GcI/AAAAAAAAJhQ/H5ztSXUAVYIKy2cEynjAOMd1M9qicizcgCLcBGAsYHQ/s1600/404.png"}
                alt={"404"}
                sx={{
                    width: '500px'
                }}
            />
            <Box component={"button"} onClick={() => navigate(-1)} sx={{
                display: 'block',
                width: 'max-content',
                padding: '.65rem 1.8rem',
                borderRadius: '5px', cursor: 'pointer',
                fontSize: '1.1rem', fontWeight: '600', border: 'none', outline: 'none',
                background: 'var(--primary-color)',
                color: 'white'
            }}>
                Quay lại
            </Box>
        </Box>
    )
}

export default Router