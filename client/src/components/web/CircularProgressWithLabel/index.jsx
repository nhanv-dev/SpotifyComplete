import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";


function CircularProgressWithLabel(props) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Box component={"div"} sx={{position: 'relative', display: 'inline-flex'}}>
                <CircularProgress variant="determinate" {...props} size={'60px'} sx={{color: "#1ed760"}}/>
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="caption" component="div" color="white"
                                sx={{fontWeight: '600', fontSize: '0.9rem'}}>
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
            <Typography variant="caption" component="div" color="white"
                        sx={{display: 'block', fontSize: '1.05rem', fontWeight: 600}}>
                {props.message || 'Đang xử lý'}
            </Typography>
        </Box>
    )
        ;
}

export default CircularProgressWithLabel;