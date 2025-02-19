import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA2iL0cjqnn5P36C4iqvzdFtPKtZ3421CQ",
    authDomain: "spotify-storage-2bef1.firebaseapp.com",
    projectId: "spotify-storage-2bef1",
    storageBucket: "spotify-storage-2bef1.appspot.com",
    messagingSenderId: "908090289044",
    appId: "1:908090289044:web:495f97b952ddb412077d81",
    measurementId: "G-GJKQ0X0T71"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);