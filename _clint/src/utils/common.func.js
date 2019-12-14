import conf from "../constents/settings";

function makeid() {
    return Math.random().toString(36).substring(4);
}

export const uuid = () => {
    const uuid = "0x" + makeid() + makeid() + makeid() + new Date().getTime().toString().substr(5);
    return uuid.split('').sort(function () {
        return 0.5 - Math.random()
    }).join('');
};
export const setCookie = (name, value, days) => {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
export const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
};

export const eraseCookie = (name) => {
    document.cookie = name + '=; Max-Age=-99999999;';
};

export const tokenEncoder = (value) => {
    let result = "";
    for (let i = 0; i < value.length; i++) {
        if (i < value.length - 1) {
            result += value.charCodeAt(i) + 10;
            result += "-";
        } else {
            result += value.charCodeAt(i) + 10;
        }
    }
    return result;
};

export const tokenDencoder = (value) => {
    let result = "";
    const array = value.split("-");

    for (let i = 0; i < array.length; i++) {
        result += String.fromCharCode(array[i] - 10);
    }
    return result;
};


export const rawGetData = (url, data, callback) => {
    $.ajax({
        url: conf.origin + url,
        type: 'POST',
        data: data,
        success: (returnData) => {
            callback(returnData);
        }
    })
};
