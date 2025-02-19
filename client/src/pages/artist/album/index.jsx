import React, {useEffect, useState} from 'react';
import SpotifyService from "../../../services/SpotifyService";
import {useParams} from 'react-router-dom';
import {ShowingAlbum} from "../create-album";
import Helmet from "../../../components/common/Helmet";

function Album() {
    const {id} = useParams();
    const [songs, setSongs] = useState([]);
    const [title, setTitle] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(() => {
        SpotifyService.getAlbumById(id)
            .then(res => {
                setTitle(res.data.album.title)
                setImage(res.data.album.imageUrl)
                setSongs(res.data.album.songs)
            })
            .catch(err => {
                setSongs([])
            })
    }, [id])

    return (
        <Helmet title={title}>
            <ShowingAlbum albumId={id} title={title} songs={songs} image={image}/>
        </Helmet>
    );
}

export default Album;


