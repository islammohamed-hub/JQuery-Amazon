function setCookie(cookieName, cookieValue, expDate) {

    var date = new Date();
    date.setMonth(date.getMonth() + 2);


    if (cookieName == undefined || cookieValue == undefined) {
        throw "One of the paramter is not valid";
    }
    else if (!isNaN(cookieName)) {
        throw "Name should be a string";
    }
    else {
        if (expDate == undefined) {
            document.cookie = cookieName + "=" + cookieValue + ";expires=" + date;
        }
        else {
            document.cookie = cookieName + "=" + cookieValue + ";expires=" + expDate;
        }
    }
}

function getCookie(cookieName) {
    /* if (cookieName == undefined) {
        throw "You didn't insert the paramter";
    } */
    if (!isNaN(cookieName)) {
        throw "Name should be a string";
    }
    else {
        var assArray = [];
        var splitCookie = document.cookie.split(";");

        for (i = 0; i < splitCookie.length; i++) {
            assArray[splitCookie[i].split("=")[0].trim()] = splitCookie[i].split("=")[1]
        }
        return assArray[cookieName];
    }
}

function deleteCookie(cookieName) {
    if (cookieName == undefined) {
        throw "You didn't insert the paramter";
    }
    else if (!isNaN(cookieName)) {
        throw "Name should be a string";
    }
    else {
        var date = new Date();
        date.setMonth(date.getMonth() - 2);
        document.cookie = cookieName + "=;expires=" + date;
    }
}
