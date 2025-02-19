import { Box, Button } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import React from "react";
import * as routesConfig from "../../../config/routes";

const links = [
    { title: 'Hồ sơ của tôi', url: `/services${routesConfig.serviceArtist}` }, 
    { title: 'Tải nhạc lên', url: `/services${routesConfig.serviceUploadSong}` },
    { title: 'Tạo album', url: `/services${routesConfig.serviceCreateAlbum}` },
]
const ButtonGroupService = () => {

    return (
        <Box component='div' sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {links.map(link => (
                <MyButton key={link.title} title={link.title} url={link.url} />
            ))}
        </Box>
    )
}
const MyButton = (props) => {
    const isActive = () => {
        let pathname = window.location.pathname;
        return pathname.includes(props.url) && (pathname.replace(props.url, '').replaceAll('/', '').length === 0);
    }

    return (
        <Button
            variant="contained"
            sx={{
                color: 'white',
                fontSize: '0.9rem',
                boxShadow: 'none',
                textTransform: 'none',
                fontWeight: '500',
                letterSpacing: '.4px',
                backgroundColor: isActive() ? 'rgba(13,13,13,.65)' : 'transparent',
                '&:hover': {
                    backgroundColor: 'rgba(13,13,13,.25)',
                    boxShadow: 'none',
                }
            }}
            component={Link} to={props.url}
        >
            {props.title}
        </Button>
    )
}
export default ButtonGroupService;