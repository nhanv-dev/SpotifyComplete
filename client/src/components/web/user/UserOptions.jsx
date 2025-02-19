import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import {Avatar, Box, Button, Menu, MenuItem} from '@mui/material';
import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "../../../redux/actions/userActions";

export default function UserOptions() {
    const {user} = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [loaded, setLoaded] = useState(true)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleLogout = async (e) => {
        e.preventDefault();
        const action = await logout();
        dispatch(action);
        navigate("/login");
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box sx={{
            backgroundColor: 'rgba(0,0,0,.7)',
            borderRadius: '50px',
            '.header__on-scroll &': {
                marginRight: '.5rem',
                backgroundColor: 'rgba(33,33,33,1)'
            }
        }}>
            <Button
                id="user-options"
                aria-controls={open ? 'menu-user' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                    textTransform: 'none',
                    color: '#fff',
                    gap: 1,
                    padding: 0,
                    borderRadius: '50px',
                    '&:hover': {
                        backgroundColor: 'transparent'
                    },

                }}>
                <Avatar src={user.avatar} sx={{transform: 'scale(.7)'}}/>
                <Box sx={{
                    maxWidth: '180px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <Box sx={{
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        flex: '1',
                        fontSize: '.85rem'
                    }}>
                        {user?.info?.name}
                    </Box>
                    <ArrowDropDownOutlinedIcon sx={{
                        width: '2rem',
                        paddingRight: '.5rem',
                    }}/>
                </Box>
            </Button>
            <Menu
                id="menu-user"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'user-options',
                }}
                sx={{
                    mt: 1,
                    '& div': {background: 'transparent'},
                    '& ul': {
                        backgroundColor: '#282828',
                        color: '#fff',
                        boxShadow: '0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%)',
                        maxHeight: 'calc(100vh - 24px)',
                        maxWidth: '350px',
                        minWidth: '160px',
                        overflowY: 'auto',
                        padding: '5px',
                        '& li': {
                            fontSize: '.85rem',
                            fontWeight: '500',
                            letterSpacing: '.5px',
                            paddingTop: '8px',
                            paddingBottom: '8px',
                            borderRadius: '5px',
                            transition: 'all .15s ease-in-out',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,.1)',
                            }
                        }
                    }
                }}
            >
                <MenuItem onClick={() => navigate("/profile")}>Tài khoản</MenuItem>
                <MenuItem onClick={() => navigate("/services/artist")}>Hồ sơ của tôi</MenuItem>
                <MenuItem onClick={() => navigate("/services/song/upload")}>Tải nhạc lên</MenuItem>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            </Menu>
        </Box>
    );
}