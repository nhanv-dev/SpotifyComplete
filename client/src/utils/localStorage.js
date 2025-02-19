export const getItem = (item) => {
    const data = localStorage.getItem("persist:root");
    if (!data) return null;
    return JSON.parse(data)[item];
}

export const setItem = (item, value) => {
    const data = localStorage.getItem("persist:root") || "{}";
    const parsed = JSON.parse(data);
    parsed[item] = value;
    localStorage.setItem("persist:root", JSON.stringify(parsed));
}

export const removeItem = (item) => {
    const data = localStorage.getItem("persist:root") || "{}";
    const parsed = JSON.parse(data);
    delete parsed[item];
    localStorage.setItem("persist:root", JSON.stringify(parsed));
}