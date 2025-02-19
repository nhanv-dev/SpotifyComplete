import { Box, Button, Container, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './index.scss';
import dayjs from "dayjs";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../../../components/common/Helmet";
import UserService from "../../../services/UserService";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import Logo from "../../../assets/images/logo-black.png";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
const Register = () => {
    const navigate = useNavigate();
    const [birthday, setBirthday] = useState(() => {
        return `01/01/2000`;
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        document.body.classList.add('normal');

        return () => {
            document.body.classList.remove('normal');
        };
    }, []);

    const handleSetBirday = (e) => {
        const dd = e.$D
        const mm = e.$M + 1
        const yyyy = e.$y
        setBirthday(`${mm}/${dd}/${yyyy}`);
    }

    const validateResponse = (data) => {
        if (data?.message?.includes("password")) {
            setError({
                password: {
                    message: data.message
                }
            })
        } else if (data?.message?.includes("email")) {
            setError({
                email: {
                    message: data.message
                }
            })
        } else if (data?.message?.includes("name")) {
            setError({
                name: {
                    message: data.message
                }
            })
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const gender = e.target.gender.value;
        await UserService.register({ name, email, password, birthday, gender })
            .then(res => {
                if (res.status === 200) navigate('/login')
            })
            .catch(err => {
                if (err.response) {
                    validateResponse(err.response.data);
                }
            })
    }

    return (
        <Helmet title={"Đăng ký"}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Container >
                    <Box sx={{ width: '450px', mx: 'auto', pt: '50px', pb: '150px' }}>
                        <Box sx={{
                            display: 'flex', alignItems: 'center', justifyItems: 'center', flexDirection: 'column'
                        }}>
                            <Box component="img" alt='Logo Spotify'
                                src={Logo}
                                sx={{ maxWidth: '150px', margin: 'auto' }} />
                            <Box component="div" sx={{
                                textAlign: 'center', width: '100%',
                                paddingBottom: '.6rem', marginBottom: '1.2rem', marginTop: '1rem',
                                borderBottom: '1px solid rgba(255, 255, 255,.1)',
                                fontSize: '1.8rem', color: '#000', fontWeight: '600', letterSpacing: '-0.03em'
                            }}>
                                Sign up for free to start listening.
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Button type={"button"} variant="contained"
                                sx={{
                                    backgroundColor: '#405A93',
                                    display: 'block', width: '390px',
                                    padding: '10px', mb: 3,
                                    border: '2px solid #405A93',
                                    borderRadius: '50px', boxShadow: 'none',
                                    transition: 'all .45s ease-out',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                    fontSize: '0.975rem', color: '#fff', textTransform: 'none', fontWeight: '800',
                                    '&:hover': { backgroundColor: '#384F81', }
                                }}>
                                <FacebookRoundedIcon />
                                <p>Sign up with Facebook</p>
                            </Button>
                            <Button type={"button"} variant="contained"
                                sx={{
                                    backgroundColor: '#fff',
                                    display: 'block', width: '390px',
                                    padding: '10px', mb: 3,
                                    border: '2px solid rgb(83, 83, 83)',
                                    borderRadius: '50px', boxShadow: 'none',
                                    transition: 'all .45s ease-out',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                    fontSize: '0.975rem', color: 'rgb(83, 83, 83)', textTransform: 'none', fontWeight: '800',
                                    '&:hover': { backgroundColor: '#fff', }
                                }}>
                                <Box component={"img"} alt='google'
                                    src={"https://drraymondasemente.com/wp-content/uploads/2017/08/google_logo1600.png"}
                                    sx={{
                                        width: '22px'
                                    }}
                                />
                                <p>Sign up with Google</p>
                            </Button>
                            <Box sx={{
                                width: '100%', mb: 3,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                color: 'rgb(204, 204, 204)',
                                fontSize: '16px', letterSpacing: '2px',
                            }}>
                                <Box sx={{
                                    flex: 1, height: '1px', background: 'rgb(204, 204, 204)'
                                }} />
                                or
                                <Box sx={{
                                    flex: 1, height: '1px', background: 'rgb(204, 204, 204)'
                                }} />
                            </Box>
                            <Box component="div" sx={{
                                textAlign: 'center', width: '100%',
                                paddingBottom: '.6rem', mb: 3,
                                borderBottom: '1px solid rgba(255, 255, 255,.1)',
                                fontSize: '1.2rem', color: '#000', fontWeight: '600', letterSpacing: '-0.03em'
                            }}>
                                Sign up with your email address
                            </Box>
                        </Box>
                        <Box component={"form"} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                            onSubmit={handleRegister}>
                            <LabelInput type={"email"} name={"email"} label={"What's your email?"} placeholder={'Enter your email'} error={error?.email} />
                            <LabelInput type={"password"} name={"password"} label={"Create a passwod"} placeholder={'Create a passwod'} error={error?.password} />
                            <LabelInput type={"text"} name={"name"} label={"What should we call you?"} placeholder={'Enter your profile name'} error={error?.name} />
                            <Box component={"label"} htmlFor={""}
                                sx={{
                                    width: '100%',
                                    fontSize: '0.9rem', fontWeight: 600, mb: 1,
                                }}>
                                What's your date of birth?
                            </Box>
                            <DatePicker
                                InputProps={{
                                    disableUnderline: true
                                }}
                                sx={{
                                    width: '100%',
                                    borderRadius: '4px',
                                    outline: 'none', border: '2px solid rgb(118, 118, 118)',
                                    flex: '1', mb: 3,
                                    fontSize: '0.9rem', color: 'black', fontWeight: 600,
                                    '& input': {
                                        outline: 'none',
                                        border: 'none',
                                        padding: 0, minHeight: '48px',
                                        px: 1.5,
                                    },
                                    '& fieldset': {
                                        outline: 'none',
                                        border: 'none',
                                    }
                                }} value={dayjs(birthday)} onChange={(value) => handleSetBirday(value)} />
                            <Box component={"label"}
                                sx={{
                                    width: '100%',
                                    fontSize: '0.9rem', fontWeight: 600, mb: 1,
                                }}>
                                What's your gender?
                            </Box>
                            <RadioGroup row name="gender" defaultValue="MALE"

                                sx={{
                                    mb: 3,
                                    width: '100%'
                                }}
                            >
                                <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                                <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                                <FormControlLabel value="OTHER" control={<Radio />} label="Other" />
                            </RadioGroup>
                            <Button type={"submit"}
                                variant="contained"
                                sx={{
                                    backgroundColor: 'var(--primary-color)',
                                    display: 'block', width: '220px',
                                    padding: '0.8rem 1.8rem',
                                    borderRadius: '50px',
                                    transition: 'all .45s ease-out',
                                    fontSize: '0.975rem', color: '#fff', fontWeight: '800',
                                    '&:hover': {
                                        backgroundColor: 'var(--primary-color)',
                                    }
                                }}>
                                <p>Sign up</p>
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                fontSize: '0.95rem', fontWeight: 600,
                                textAlign: 'center',
                                marginTop: '1.6rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                            }}
                        >
                            <p>Have an account ? </p>
                            <Box component={Link} to={"/login"} sx={{
                                color: 'var(--primary-color)',
                                textDecoration: 'underline',
                            }}>
                                Login
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </LocalizationProvider>

        </Helmet>
    );
};

const LabelInput = ({ label, type, name, placeholder, error }) => {
    const [messageError, setMessageError] = useState(error?.message);

    useEffect(() => {
        setMessageError(error?.message)
    }, [error])

    return (
        <>
            <Box component={"label"} htmlFor={name}
                sx={{
                    width: '100%',
                    fontSize: '0.9rem', fontWeight: 600, mb: 1,
                }}>
                {label}
            </Box>
            <Box sx={{ width: '100%', mb: 3 }}>
                <Box component={"input"} type={type} name={name} placeholder={placeholder}
                    onChange={(e) => {
                        e.preventDefault();
                        if (messageError) setMessageError(null);
                    }}
                    sx={{
                        backgroundColor: 'white',
                        display: 'block', width: '100%',
                        px: 1.5,
                        minHeight: '48px',
                        borderRadius: '4px',
                        outline: 'none', border: '2px solid rgb(118, 118, 118)',
                        flex: '1',
                        fontSize: '0.9rem', color: 'black', fontWeight: 600,
                    }}
                />
                {messageError &&
                    <Box sx={{ color: 'var(--danger)', mt: 1, fontWeight: 500 }}>
                        {messageError}
                    </Box>
                }
            </Box >
        </>
    )
}

export default Register;