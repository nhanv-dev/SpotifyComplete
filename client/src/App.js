import React from 'react';
import {useSelector} from "react-redux";
import './assets/scss/index.scss';
import useAudio from "./hooks/useAudio";
import Router from "./routes/Router";
import Toast from "./components/common/toast";


function App() {
    const {audio} = useSelector(state => state);
    const [setTrack] = useAudio();

    return (
        <div>
            <Toast/>
            <Router/>
        </div>
    )
}

export default App;
