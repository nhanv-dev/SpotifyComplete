import {Box, Button, Container, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import './index.scss';
import dayjs from "dayjs";
import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Helmet from "../../../components/common/Helmet";
import UserService from "../../../services/UserService";
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import Logo from "../../../assets/images/logo-black.png";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {useDispatch, useSelector} from "react-redux";
import Header from "./Header";
import HomeIcon from '@mui/icons-material/Home';
import Sidebar from "./Sidebar";
import {toast} from "react-toastify";
import {updateUser} from "../../../redux/actions/userActions";

const Profile = () => {
    const {user} = useSelector(state => state);
    const dispatch = useDispatch();
    const [birthday, setBirthday] = useState();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    const [error, setError] = useState(null);

    useEffect(() => {
        const d = new Date(user?.info?.birthday);
        setBirthday(`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`);
        setName(user?.info?.name)
        setGender(user?.info?.gender)
        document.body.classList.add('normal');
        return () => document.body.classList.remove('normal')
    }, [user]);

    const handleReset = () => {
        const d = new Date(user?.info?.birthday);
        setBirthday(`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`);
        setName(user?.info?.name)
        setGender(user?.info?.gender)
    }

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

    const handleSave = async (e) => {
        e.preventDefault();
        const gender = e.target.gender.value;
        await UserService.editProfile({id: user.info._id, name, birthday, gender})
            .then(res => {
                dispatch(updateUser(res.data.user))
                toast.success('Cập nhật thông tin thành công')
            })
            .catch(err => {
                toast.error('Cập nhật thông tin thất bại')
                if (err.response) {
                    validateResponse(err.response.data);
                }
            })
    }

    return (
        <Helmet title={"Profile"}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{background: '#18243B', minHeight: '100vh'}}>
                    <Header></Header>
                    <Box sx={{width: '1100px', mx: 'auto'}}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                width: '100%',
                                pt: 10, px: 8, pb: 0
                            }}
                            className={"linear-background"}>
                            <Box>
                                <Box sx={{color: 'white', fontSize: '5rem', fontWeight: '800', mb: 1}}>
                                    Don't let go
                                </Box>
                                <Box sx={{color: 'white', fontSize: '1rem', fontWeight: '600', mb: 3}}>
                                    Your plan is due to end on 7/24/23. Not ready to say goodbye?
                                </Box>
                                <Button variant="contained"
                                        sx={{
                                            backgroundColor: 'var(--primary-color)',
                                            display: 'block',
                                            padding: '0.5rem 1.8rem',
                                            borderRadius: '50px',
                                            transition: 'all .45s ease-out', textTransform: 'capitalize',
                                            fontSize: '0.975rem', color: '#fff', fontWeight: '800',
                                            '&:hover': {
                                                backgroundColor: 'var(--primary-color)',
                                            }
                                        }}>
                                    <p>Renew Premium</p>
                                </Button>
                            </Box>
                            <Box component={'img'} sx={{width: '25%'}}
                                 src={'https://www.scdn.co/i/account/overview/iphone-ddd9e69.png'}/>
                        </Box>
                        <Box sx={{display: 'flex'}}>
                            <Box sx={{width: '300px', background: '#1B1B1B'}}>
                                <Sidebar/>
                            </Box>
                            <Box sx={{
                                flex: 1, p: 5,
                                background: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center', pb: 10
                            }}>
                                <Box component={"form"} sx={{width: '100%'}} onSubmit={handleSave}>
                                    <LabelInput type={"email"}
                                                name={"email"}
                                                value={user?.info?.email}
                                                label={"Email"}
                                                error={error?.email}/>
                                    <LabelInput type={"text"}
                                                name={"name"}
                                                value={name}
                                                onChangeValue={(e) => {
                                                    setName(e.target.value)
                                                }}
                                                label={"Name"}
                                                placeholder={'Enter your profile name'}
                                                error={error?.name}/>
                                    <Box component={"label"} htmlFor={""}
                                         sx={{
                                             width: '100%', display: 'block',
                                             fontSize: '0.9rem', fontWeight: 600, mb: 2,
                                         }}>
                                        Date of birth
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
                                        }} value={dayjs(birthday)} onChange={(value) => handleSetBirday(value)}/>
                                    <Box component={"label"}
                                         sx={{
                                             width: '100%', display: 'block',
                                             fontSize: '0.9rem', fontWeight: 600, mb: 2,
                                         }}>
                                        Gender
                                    </Box>
                                    <RadioGroup row name="gender" value={gender} onChange={(e) => {
                                        setGender(e.target.value)
                                    }}
                                                sx={{mb: 3, width: '100%'}}>
                                        <FormControlLabel value="MALE" control={<Radio/>} label="Male"/>
                                        <FormControlLabel value="FEMALE" control={<Radio/>} label="Female"/>
                                        <FormControlLabel value="OTHER" control={<Radio/>} label="Other"/>
                                    </RadioGroup>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'flex-end',
                                        gap: '10px'
                                    }}>
                                        <Button type={"button"}
                                                onClick={handleReset}
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: '#222326',
                                                    display: 'block',
                                                    padding: '0.5rem 3rem',
                                                    borderRadius: '50px',
                                                    transition: 'all .45s ease-out',
                                                    textTransform: 'capitalize',
                                                    fontSize: '0.975rem', color: '#fff', fontWeight: '800',
                                                    '&:hover': {
                                                        backgroundColor: '#222326',
                                                    }
                                                }}>
                                            <p>Cancel</p>
                                        </Button>
                                        <Button type={"submit"}
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: 'var(--primary-color)',
                                                    display: 'block',
                                                    padding: '0.5rem 3rem',
                                                    borderRadius: '50px',
                                                    transition: 'all .45s ease-out',
                                                    textTransform: 'capitalize',
                                                    fontSize: '0.975rem', color: '#fff', fontWeight: '800',
                                                    '&:hover': {
                                                        backgroundColor: 'var(--primary-color)',
                                                    }
                                                }}>
                                            <p>Save profile</p>
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </LocalizationProvider>
        </Helmet>
    );
};

const LabelInput = ({label, type, name, value, onChangeValue, placeholder, error}) => {
    const [messageError, setMessageError] = useState(error?.message);

    useEffect(() => {
        setMessageError(error?.message)
    }, [error])

    return (
        <>
            <Box component={"label"} htmlFor={name}
                 sx={{
                     width: '100%',
                     fontSize: '0.9rem',
                     fontWeight: 600,
                     display: 'block',
                     mb: 2,
                 }}>
                {label}
            </Box>
            <Box sx={{width: '100%', mb: 3}}>
                <Box component={"input"} type={type} name={name} value={value}
                     placeholder={placeholder}
                     onChange={(e) => {
                         e.preventDefault();
                         if (onChangeValue) onChangeValue(e);
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
                    <Box sx={{color: 'var(--danger)', mt: 1, fontWeight: 500}}>
                        {messageError}
                    </Box>
                }
            </Box>
        </>
    )
}

export default Profile;