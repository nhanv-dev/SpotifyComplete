export function formatMediumTime(date) {
    date = new Date(date)
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function formatLongHourMinuteSeconds(date) {
    date = new Date(date)
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}