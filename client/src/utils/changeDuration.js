export function changeDuration(duration, option) {
    let seconds = Math.floor((duration / 1000) % 60)
    let minutes = Math.floor((duration / (1000 * 60)) % 60)
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    console.log((duration / (1000 * 60)) % 60)
    if (hours !== 0)
        hours = (hours < 10) ? '0' + hours : hours;
    else
        hours = '0'
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    if (option === 'max') {
        return (hours === '0' ? '' : hours + ' giờ ') + minutes + ' phút ' + seconds + ' giây'
    }
    return (hours === '0' ? '' : hours + ':') + minutes + ':' + seconds
}

export function formatTime(duration) {
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
    let ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}