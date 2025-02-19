import React from 'react';
import {Box} from "@mui/material";

function InnerFooter() {
    return (
        <Box sx={{mx: 3, background: '#181818', py: 5, borderRadius: '8px'}}>
            <Box sx={{display: 'flex', gap: 5, mb: 3, px: 5}}>
                <Box sx={{minWidth: '200px'}}>
                    <HeadingLabel title={'Company'}/>
                    <Label title={'About'}/>
                    <Label title={'Jobs'}/>
                    <Label title={'For the Record'}/>
                </Box>
                <Box sx={{minWidth: '200px'}}>
                    <HeadingLabel title={'Communities'}/>
                    <Label title={'For Artists'}/>
                    <Label title={'Developers'}/>
                    <Label title={'Advertising'}/>
                    <Label title={'Investors'}/>
                    <Label title={'Vendors'}/>
                    <Label title={'Spotify for Work'}/>
                </Box>
                <Box sx={{minWidth: '200px'}}>
                    <HeadingLabel title={'Useful links'}/>
                    <Label title={'Support'}/>
                    <Label title={'Free Mobile App'}/>
                </Box>
            </Box>
            <Box sx={{
                px: 5, pt: 3, borderTop: '1px solid #ffffff1a'
            }}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 5}}>
                    <Box sx={{display: 'flex', gap: 5}}>
                        <SmallLabel title={'Legal'}/>
                        <SmallLabel title={'Privacy Center'}/>
                        <SmallLabel title={'Privacy Policy'}/>
                        <SmallLabel title={'Cookies'}/>
                        <SmallLabel title={'About Ads'}/>
                        <SmallLabel title={'Accessibility'}/>
                    </Box>
                    <Box sx={{fontWeight: '500', fontSize: '0.9rem'}}>@2023 Spotify AB</Box>
                </Box>
            </Box>
        </Box>
    );
}

const HeadingLabel = ({title}) => {
    return (
        <Box sx={{
            fontWeight: '600', fontSize: '0.95rem', mb: 2, cursor: 'default'
        }}>
            {title}
        </Box>
    )
}
const Label = ({title}) => {
    return (
        <Box sx={{
            fontWeight: '500', fontSize: '0.95rem', color: '#a7a7a7', mb: 2, cursor: 'pointer'
        }}>
            {title}
        </Box>
    )
}
const SmallLabel = ({title}) => {
    return (
        <Box sx={{
            fontWeight: '500', fontSize: '0.9rem', color: '#a7a7a7', mb: 2, cursor: 'pointer'
        }}>
            {title}
        </Box>
    )
}
export default InnerFooter;