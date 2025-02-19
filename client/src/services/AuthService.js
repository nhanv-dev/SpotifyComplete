/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
export const isRole = (user, role) => {
    // user = user || localStorage.getItem('user');
    if (!user || !user.token || !user.info) return false;
    if (role) return user.info[role];
    return true;
}

export const isAdmin = 'isAdmin';
export const isArtist = 'isArtist';