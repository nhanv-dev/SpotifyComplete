import axios from "axios";
import {getItem} from "./localStorage";

// export const baseURL = "http://localhost:5000/api/";
export const baseURL = "https://software-engineering-project-z8hp.vercel.app/api/";

export const publicRequest = () => {
    return axios.create({
        baseURL: baseURL,
    });
}

export const protectedRequest = () => {
    const token = getItem("user")?.token
    return axios.create({
        baseURL: baseURL,
        headers: {'x-auth-token': `${token}`},
    });
}
