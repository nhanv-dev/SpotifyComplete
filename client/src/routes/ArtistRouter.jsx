import React, {lazy} from 'react';
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import {useSelector} from "react-redux";
import {NotFound} from "./Router";
import {isArtist, isRole} from "../services/AuthService";
import * as config from "../config/routes";

const Artist = lazy(() => import('../pages/artist/artist'));
const EditSong = lazy(() => import('../pages/artist/edit-song'));
const UploadSong = lazy(() => import('../pages/artist/upload-song'));
const Album = lazy(() => import('../pages/artist/album'));
const CreateAlbum = lazy(() => import('../pages/artist/create-album'));

const routes = [
    {path: config.serviceArtist, element: Artist},
    {path: config.serviceUploadSong, element: UploadSong},
    {path: config.serviceEditSong, element: EditSong},
    {path: config.serviceDetailAlbum, element: Album},
    {path: config.serviceCreateAlbum, element: CreateAlbum},
];

function ArtistRouter() {
    const {user} = useSelector(state => state);

    return (
        <Routes>
            {routes.map(route => (
                <Route key={route.path} path={route.path} exact={true} element={
                    <ProtectedRoute isAccepted={() => isRole(user, isArtist)} to={"/login"}>
                        <route.element/>
                    </ProtectedRoute>
                }/>
            ))}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}

export default ArtistRouter;