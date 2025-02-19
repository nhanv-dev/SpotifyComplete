import React from 'react';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './style.css'

function Toast() {
    return (
        <ToastContainer position={'top-center'}
                        autoClose={800}
                        hideProgressBar={false}
                        closeOnClick={true}
                        pauseOnHover={true}
                        draggable={true}
                        progress={undefined}
                        theme={'dark'}
        />

    );
}

export default Toast;