/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import * as types from '../constants/ActionType'
import {protectedRequest, publicRequest} from "../../utils/requestMethod";
import UserService from '../../services/UserService';

export const login = async (payload) => {
    const action = {type: types.user.USER_LOGIN_FAILED};
    await UserService.login({...payload})
        .then(res => {
            action.payload = {
                token: res.data.token,
                info: {...res.data.user},
            }
            action.type = types.user.USER_LOGIN_SUCCESS;
        })
        .catch(err => {
            action.type = types.user.USER_LOGIN_FAILED;
            action.error = err.response?.data || 'Password invalid';
        })
    return {...action}
}

export const logout = async () => {
    return {
        type: types.user.USER_LOGOUT,
    }
}

export const validateToken = async () => {
    let action = {type: types.user.CHECK_TOKEN_FAILED};
    await protectedRequest().get("/auth/token-valid")
        .then(res => {
            action = {
                type: types.user.CHECK_TOKEN_SUCCESS,
                payload: res.data,
            }
        })
        .catch(err => {
            action = {type: types.user.CHECK_TOKEN_FAILED}
        })
    return {...action}
}

export const updateUser = (user) => {
    return {
        type: types.user.UPDATE_USER_SUCCESS,
        payload: {info: {...user}}
    }
}
