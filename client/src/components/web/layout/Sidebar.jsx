import {Link, NavLink, useNavigate} from 'react-router-dom'
import {Box, Divider, List, ListItem, ListItemText} from '@mui/material'
import {AddBoxSharp, ArrowCircleDown, FavoriteSharp, Home, LibraryMusic, Search} from '@mui/icons-material';
import {useDispatch, useSelector} from "react-redux";
import Logo from '../../../assets/images/logo-white.png'
import UserPlaylist from '../user/UserPlaylist'
import * as ActionType from "../../../redux/constants/ActionType";
import {createPlaylist} from '../../../redux/actions/playlistActions';
import {toast} from "react-toastify";

export default function Sidebar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, playlist} = useSelector(state => state);

    async function handleCreatePlaylist() {
        if (!user?.info?._id) return;

        const payload = {
            name: `My Playlist #${playlist.length + 1}`,
            user: user.info._id,
            songs: []
        }
        const action = await createPlaylist(payload);
        if (action.type === ActionType.playlist.CREATE_PLAYLIST) {
            dispatch(action);
            toast.success(`Tạo playlist thành công`)
        } else {
            toast.error('Tạo playlist thất bại')
        }
    }

    return (
        <Box className='sidebar'>
            <Box sx={{px: 2}}>
                <List>
                    <ListItem sx={{mb: 1}} className='sidebar__logo' component={Link} to='/'>
                        <img src={Logo} alt='SpotifyService'/>
                    </ListItem>
                    <ItemLink url='/' exact={true}>
                        <Home/>
                        <ListItemText primary="Trang chủ"/>
                    </ItemLink>
                    <ItemLink url='/search' exact={true}>
                        <Search/>
                        <ListItemText primary="Tìm kiếm"/>
                    </ItemLink>
                    <ItemLink url='/collection' exact={true}>
                        <LibraryMusic/>
                        <ListItemText primary="Thư viện"/>
                    </ItemLink>
                </List>
                <List>
                    <ListItem
                        className='sidebar__items__link'
                        component={'button'} onClick={handleCreatePlaylist}
                        sx={{
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            cursor: 'pointer',
                            transition: 'all .2s ease'
                        }}
                    >
                        <AddBoxSharp/>
                        <ListItemText primary="Tạo playlist"/>
                    </ListItem>
                    <ItemLink url='/liked-tracks' exact={false}>
                        <FavoriteSharp/>
                        <ListItemText primary="Bài hát đã thích"/>
                    </ItemLink>
                </List>
                <Divider variant="fullWidth"/>
            </Box>
            <UserPlaylist/>
            <Box sx={{px: 2, pb: 1}}>
                <ListItem className="sidebar__items__link" component={Link} to='/download'>
                    <ArrowCircleDown/><span> Cài đặt ứng dụng</span>
                </ListItem>
            </Box>
        </Box>
    )
}

const ItemLink = (props) => {

    return (
        <ListItem
            className='sidebar__items__link'
            sx={{transition: 'all .2s ease'}}
            component={NavLink}
            to={props.url}
            exact={props.exact ? 'true' : 'false'}
        >
            {props.children}
        </ListItem>
    )
}