import React from 'react';
import Box from "@mui/material/Box";
import Logo from "../../../assets/images/logo-white.png"
import {Link} from "react-router-dom";

function Header() {
    return (
        <Box sx={{width: '100%', background: 'black'}}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '1100px',
                mx: 'auto',
                p: 2
            }}>
                <Box component={Link} to={"/"} sx={{display: 'block'}}>
                    <Box component={'img'} src={Logo} sx={{width: '132px'}}></Box>
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between', gap: '2rem'
                }}>
                    <Box component={Link} to={"/"} sx={{
                        fontSize: '1.075rem', fontWeight: '600', color: 'white', textDecoration: 'none'
                    }}>
                        Premium
                    </Box>
                    <Box component={Link} to={"/"} sx={{
                        fontSize: '1.075rem', fontWeight: '600', color: 'white', textDecoration: 'none'
                    }}>
                        Support
                    </Box>
                    <Box component={Link} to={"/"} sx={{
                        fontSize: '1.075rem', fontWeight: '600', color: 'white', textDecoration: 'none'
                    }}>
                        Download
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Header;