/* SignUp Function */

const signUp = e => {
    var pass1 = document.getElementById("password").value;
    var pass2 = document.getElementById("repeatPassword").value;
    var userName = document.getElementById("userName").value;
    var userEmail = document.getElementById("eMail").value;
    var checkMail = JSON.parse(localStorage.getItem("Users"));
    var span = document.getElementById("passSpan");
    for (let item in checkMail) {
        if (userName === checkMail[item].uName) {
            span.innerText = "User Name already exists";
            e.preventDefault();
            e.stopPropagation();
        }
        else if (userEmail === checkMail[item].eMail) {
            span.innerText = "E-Mail already exists";
            e.preventDefault();
            e.stopPropagation();
        }
    }
    if (pass1 != pass2) {
        span.innerText = "Password doesn't match";
        e.preventDefault();
        e.stopPropagation();
    }
    else {
        var users = JSON.parse(localStorage.getItem('Users')) || [];
        let userData =
        {
            uName: userName,
            eMail: userEmail,
            password: pass1
        }
            ;

        users.push(userData);
        localStorage.setItem('Users', JSON.stringify(users));
    }
}

/* SingIn Function */

const signIn = e => {
    let flag = 0;
    let eMail = document.getElementById("signInEmail").value;
    let userPassword = document.getElementById("signInPassword").value;
    let getUsers = JSON.parse(localStorage.getItem("Users"));

    for (let key in getUsers) {
        if (eMail === getUsers[key].eMail && userPassword === getUsers[key].password) {
            console.log("User Exist");
            flag = 1;
        }
    }

    if (flag == 0) {
        console.log("User doesn't exist")
        var rongEP=document.getElementById("rongEPDiv");
        rongEP.style.display="inline";
        e.preventDefault();
        e.stopPropagation();
    }
}


/* Draw Name in the Pages */

function drawName() {
    let urlUserEmail = getParameterByName("email");
    let getUsers = JSON.parse(localStorage.getItem("Users"));
    let signInModel = document.getElementById("signInModel");

    for (let key in getUsers) {
        if (urlUserEmail === getUsers[key].eMail) {
            setCookie("userName", getUsers[key].uName, 2 / 11 / 2020);
            signInModel.innerText = "Hello, " + getCookie("userName");
        }
    }

    let avatarImg=document.getElementById("avatarImg");
    let gender=getCookie("userGender");
    switch(gender){
        case "Male":
            avatarImg.src="img/maleAvatar.jpg";
            break;

        case "Female":
            avatarImg.src="img/femaleAvatar.jpg";
            break;
    }
}


/* Bind Information to personalInfo.html */
function bindInfo(){
    let userNameInfo=document.getElementById("userNameInfo");
    let emailAddressInfo=document.getElementById("emailAddressInfo");
    let getUsers = JSON.parse(localStorage.getItem("Users"));
    let getUser = getCookie("userName");

    for(let key in getUsers) {
        if(getUser == getUsers[key].uName) {
            userNameInfo.value=getUsers[key].uName;
            emailAddressInfo.value=getUsers[key].eMail;
        }
    }
}

function confirmInfo(){
    var userGender=document.getElementsByName("gender");

    for(var i =0;i<userGender.length;i++){
        if(userGender[i].checked){
            setCookie("userGender",userGender[i].value);
        }
    }

    location.assign("Index.html");
}

/* SignOut Fnction */
const signOut = () => {
    let userIn=getCookie("userName");
    if(userIn === undefined){
        console.log("No User detected");
    }
    else{
        deleteCookie("userName");
        deleteCookie("userGender");
    }
    let signInModel = document.getElementById("signInModel");
    location.assign("Index.html");
    signInModel.innerText="Hello, Sign in"
}


const signInPage = () => {
    location.assign("SignUp.html");
}

const profilePage = () => {
    location.assign("personalInfo.html");
}

/* Function to disable profileBTN & signOutBTN */
$(document).ready(function(){
    let gender=getCookie("userGender");
    let user=getCookie("userName");
    if(gender == undefined && user == undefined){
        $("#profileBTN").prop('disabled', true);
        $("#signOutBTN").prop('disabled', true);
    }
    if(user){
        $("#signInBTN").prop('disabled', true)
        $("#sgnInBTN").prop('disabled', true)
    }
})