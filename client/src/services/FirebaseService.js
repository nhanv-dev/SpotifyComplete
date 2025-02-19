/*
 *   Copyright (c) 2023 
 *   All rights reserved.
 */
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../config/firebase";

class Firebase {
    async uploadFile(folder, file, next, error, complete) {
        if (!file) return;
        const storageRef = ref(storage, `${folder}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        return new Promise((resolve, reject) => {
            uploadTask.on("state_changed",
                async (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    if (next) next(progress)
                },
                (err) => {
                    if (error) console.error(err)
                    reject();
                },
                async () => {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    if (complete) complete(url);
                    resolve();
                })
        })
    }
}
const FirebaseService = new Firebase();

export default FirebaseService;