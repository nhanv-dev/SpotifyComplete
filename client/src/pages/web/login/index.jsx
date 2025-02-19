import React, { useEffect, useState } from 'react'
import { Box, Button, Container } from '@mui/material'
import Logo from '../../../assets/images/logo-white.png'
import video from '../../../assets/images/video-about-us.mp4'
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../redux/actions/userActions";
import Helmet from "../../../components/common/Helmet";
import { useDispatch, useSelector } from "react-redux";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Index = () => {
    const { user } = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?.info && user?.token) navigate("/")
    }, [user])

    const handleReset = (e) => {
        e.preventDefault();
        if (error) setError(null);
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const action = await login({ email, password });
        if (action.error?.message) {
            return setError('Email hoặc mật khẩu không chính xác.')
        }
        dispatch(action)
    }

    return (
        <Helmet title={"Đăng nhập"}>
            <Container>
                <Box sx={{
                    position: 'fixed',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: '3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4rem',
                    flexDirection: 'column',
                }}>
                    <Box sx={{
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        padding: '2rem 2rem',
                        minWidth: '450px',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '8px',
                        fontWeight: '500',
                        color: 'var(--white-color)',
                    }}>
                        <Box sx={{
                            display: 'flex', alignItems: 'center', justifyItems: 'center', flexDirection: 'column'
                        }}>
                            <Box component="img"
                                src={Logo} alt='Logo SpotifyService'
                                className="logo"
                                sx={{ maxWidth: '150px', margin: 'auto' }} />
                            <Box component="div" sx={{
                                textAlign: 'center', width: '100%',
                                paddingBottom: '.6rem',
                                marginBottom: '1.2rem',
                                marginTop: '1rem',
                                borderBottom: '1px solid rgba(255, 255, 255,.1)',
                                fontSize: '2rem', color: 'white', fontWeight: '600'
                            }}>
                                Music for everyone
                            </Box>
                        </Box>
                        <Box component={"form"} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            onSubmit={handleLogin} onChange={handleReset}>
                            <Box component={"input"} type={"email"} name={"email"} placeholder={'Email'} sx={{
                                backgroundColor: 'white',
                                display: 'block', width: '330px',
                                padding: '0.75rem 1rem',
                                borderRadius: '50px',
                                outline: 'none', border: 'none',
                                flex: '1', mb: 2,
                                fontSize: '0.9rem', color: '#000', fontWeight: 500,
                            }} />
                            <Box component={"input"} type={"password"} name={"password"} placeholder={'Mật khẩu'} sx={{
                                backgroundColor: 'white',
                                display: 'block', width: '330px',
                                padding: '0.75rem 1rem',
                                borderRadius: '50px',
                                outline: 'none', border: 'none',
                                flex: '1', mb: 3,
                                fontSize: '0.9rem', color: '#000', fontWeight: 500,
                            }} />
                            {error &&
                                <Box sx={{
                                    color: 'var(--white)',
                                    background: 'var(--danger)',
                                    p: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 2,
                                    width: '320px', borderRadius: '5px',
                                    fontSize: '1rem', fontWeight: 600,
                                }}>
                                    <ErrorOutlineIcon /> {error}
                                </Box>
                            }
                            <Button type={"submit"}
                                variant="contained"
                                sx={{
                                    backgroundColor: 'var(--primary-color)',
                                    display: 'block', width: '330px',
                                    padding: '0.5rem 1.8rem',
                                    borderRadius: '50px',
                                    transition: 'all .45s ease-out',
                                    fontSize: '0.9rem', color: '#fff', fontWeight: '800',
                                    '&:hover': {
                                        backgroundColor: 'var(--primary-color)',
                                    }
                                }}>
                                <Box sx={{ position: 'relative', top: '1.5px' }}>Đăng nhập</Box>
                            </Button>
                        </Box>
                        <Box component={Link} to={"/"} sx={{
                            fontSize: '0.95rem', cursor: 'pointer',
                            color: 'var(--white-color-3)',
                            textDecoration: 'none',
                            textAlign: 'center',
                            display: 'block',
                            marginTop: '1.6rem'
                        }}>
                            Quên mật khẩu ?
                        </Box>
                        <Box sx={{
                            fontSize: '0.95rem',
                            color: 'var(--white-color-3)',
                            textAlign: 'center',
                            marginTop: '1.6rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        }}>
                            <p>Bạn chưa có tài khoản ? </p>
                            <Box component={Link} to={"/signup"} sx={{
                                color: 'var(--primary-color)',
                                textDecoration: 'underline',
                            }}>
                                Đăng ký
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box component="div" className="background-login">
                    <video width='auto' height='100%' loop autoPlay muted>
                        <source src={video} type="video/mp4"></source>
                    </video>
                </Box>
            </Container>
        </Helmet>
    )
        ;
};

export default Index;