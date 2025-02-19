/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import {protectedRequest, publicRequest} from "../utils/requestMethod";

class Spotify {

    async editProfile(user) {
        return new Promise((resolve, reject) => {
            protectedRequest().put("/users/user", user).then(resolve).catch(reject);
        })
    }

    async uploadTrack(track) {
        return new Promise((resolve, reject) => {
            protectedRequest().post("/songs", track).then(resolve).catch(reject)
        })
    }

    async updateTrack(track) {
        return new Promise((resolve, reject) => {
            protectedRequest().put(`/songs/${track._id}`, track).then(resolve).catch(reject)
        })
    }

    async getSongByArtistId(artistId) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/songs/artist/${artistId}`).then(resolve).catch(reject)
        })
    }

    async getArtistById(id) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/artists/${id}`).then(resolve).catch(reject)
        })
    }

    async getAllSongs(page = 0, limit = 6) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/songs?page=${page}&limit=${limit}`).then(resolve).catch(reject)
        })
    }


    async getSongById(id) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/songs/${id}`).then(resolve).catch(reject)
        })
    }

    async createAlbum(album) {
        return new Promise((resolve, reject) => {
            protectedRequest().post(`/albums`, album).then(resolve).catch(reject)
        })
    }

    async updateAlbum(albumId, album) {
        return new Promise((resolve, reject) => {
            protectedRequest().put(`/albums/${albumId}`, album).then(resolve).catch(reject)
        })
    }

    async deleteAlbum(albumId) {
        return new Promise((resolve, reject) => {
            protectedRequest().delete(`/albums/${albumId}`).then(resolve).catch(reject)
        })
    }

    async addSongToAlbum(albumId, songId) {
        return new Promise((resolve, reject) => {
            protectedRequest().post(`/albums/${albumId}/add-song/${songId}`).then(resolve).catch(reject)
        })
    }

    async removeSongFromAlbum(albumId, songId) {
        return new Promise((resolve, reject) => {
            protectedRequest().post(`/albums/${albumId}/remove-song/${songId}`).then(resolve).catch(reject)
        })
    }

    async getAllAlbum(page = 0, limit = 6) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/albums?page=${page}&limit=${limit}`).then(resolve).catch(reject)
        })
    }

    async getAlbumById(albumId) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/albums/${albumId}`).then(resolve).catch(reject)
        })
    }

    async getAlbumsByArtistId(artistId) {
        return new Promise((resolve, reject) => {
            publicRequest().get(`/albums/artist/${artistId}`).then(resolve).catch(reject)
        })
    }

    async createPlaylist(playlist) {
        return new Promise((resolve, reject) => {
            protectedRequest().post(`/playlists/create`, playlist).then(resolve).catch(reject)
        })
    }

    async deletePlaylist(id) {
        return new Promise((resolve, reject) => {
            protectedRequest().delete(`/playlists/${id}`).then(resolve).catch(reject)
        })
    }

    async editPlaylist(id, playlist) {
        return new Promise((resolve, reject) => {
            protectedRequest().put(`/playlists/edit/${id}`, playlist).then(resolve).catch(reject)
        })
    }

    async addSongToPlaylist({playListId, songId}) {
        return new Promise((resolve, reject) => {
            protectedRequest().put(`/playlists/addSong`, {playListId, songId}).then(resolve).catch(reject)
        })
    }

    async removeSongFromPlaylist({playListId, songId}) {
        return new Promise((resolve, reject) => {
            protectedRequest().put(`/playlists/removeSong`, {playListId, songId}).then(resolve).catch(reject)
        })
    }

    async getPlaylistById(id) {
        return new Promise((resolve, reject) => {
            protectedRequest().get(`/playlists/${id}`).then(resolve).catch(reject)
        })
    }

    async getPlaylistByUser(userId) {
        return new Promise((resolve, reject) => {
            protectedRequest().get(`/playlists/user/${userId}`).then(resolve).catch(reject)
        })
    }

    async getLikedSongs() {
        return new Promise((resolve, reject) => {
            protectedRequest().get(`/songs/liked`).then(resolve).catch(reject)
        })
    }

    async likeSong(songId) {
        return new Promise((resolve, reject) => {
            protectedRequest().put(`/songs/like/${songId}`).then(resolve).catch(reject)
        })
    }

    async search(textSearch) {
        return new Promise((resolve, reject) => {
            protectedRequest().get(`/search/search?q=${textSearch}`).then(resolve).catch(reject)
        })
    }
}

const SpotifyService = new Spotify();
export default SpotifyService;