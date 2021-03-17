$(function () {
  $('#nav-search-select').change(function () {
    var selectedText = $(this).find('option:selected').text();
    $('#nav-search').find('.nav-search-label').html(selectedText);
  });
});

/* Get the value of Query String */

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/* Getting data from URL */




/* Drawing the Data */

var getUL = document.getElementById("productUL");

$.ajax({
  url: "js/data.json",
  dataType: "json",
  type: "get",
  success: function (data) {

    /* Checking what to display */
    var urlData = getParameterByName('name');
    var getProductDiv = document.getElementById("productDiv");
    var flag = 0;
    $(data[urlData]).each(function (index, value) {

      getProductDiv.innerHTML +=
        "<div class='col-lg-3 mb-3'>" +
        "<div class='product-info'>" +
        "<div class='product'>" +
        "<p>" + value.name + "</p>" +
        "<div class='product-price my-1'>" +
        "<small>" + "$" + "</small>" +
        "<strong>" + value.price + "</strong>" +
        "</div>" +
        `<div class='product-rating' id='rating-div${flag}'>` +

        "</div style='text-align:center;'>" +
        `<a href=${value.routing}>` +
        `<img src=${value.image} class='img-fluid'>` +
        "</a>" +
        "<div class='cart-btn text-center'>" +
        `<p>${value.brand}</p>` +
        "</div>" +

        "</div>" +
        "</div>" +
        "</div>";
      var getRateingDiv = document.getElementById(`rating-div${flag}`);
      var rate = value.rating;
      for (i = 0; i < rate; i++) {
        var createI = document.createElement("i");
        createI.setAttribute("class", "fas fa-star");
        getRateingDiv.appendChild(createI);
      }
      flag++;
    })
  }
})


/* Drowing Product Details */

var proDetails = document.getElementById("productDetailsDiv");

$.ajax({
  url: "js/data.json",
  dataType: "json",
  type: "get",
  success: function (data) {
    /* Checking what to display */

    /* Display  */
    var urlId = getParameterByName('id');
    var urlName = getParameterByName('name');

    $(data[urlName][urlId - 1]).each(function (index, value) {

      proDetails.innerHTML +=
        "<div class='row'>" +
        "<div class='col-sm-7'>" +
        "<div>" +
        `<h3>${value.name}</h3>` +
        "<div>" +
        `<img src='${value.image}' id='itImage'>` +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='col-sm-4'>" +
        "<div class='card' style='line-height: 2.3;padding: 10px;margin: 5px;word-spacing: 1px;'>" +
        `<p><strong>Name:</strong>${value.name}</p>` +
        `<p><strong>Price:</strong>${value.price}</p>` +
        "<div>" +
        "<button id='add-button' class='btn btn-primary' style='width: 100%;'>Add to cart</button>" +
        "<span id='checkLogInLabel' class='label label-danger'></span>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "<div class='row' style='margin: 10px;'>" +
        "<div class='col'>" +

        "</div>" +
        "</div>" +
        "<div class='row align-items-center'>" +
        "<div class='col-5'>" +
        "<div class='product-rating' id='ratingDiv'>" +

        "</div>" +
        "</div>" +
        "<div class='row' style='margin: 10px;'>" +
        "<div class='col'>" +

        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-5'>" +
        "<div>" +
        `<p><strong>Discription:</strong>${value.description}</p>` +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";

      var getRateingDiv = document.getElementById("ratingDiv");
      var rate = value.rating;
      for (i = 0; i < rate; i++) {
        var createI = document.createElement("i");
        createI.setAttribute("class", "fas fa-star");
        getRateingDiv.appendChild(createI);
      }
    })




    document.getElementById("add-button").addEventListener("click", () => {
      let getUser = getCookie("userName");
      let itName = document.getElementsByTagName('h3')[0].innerHTML;
      let itImage = document.getElementById("itImage").getAttribute("src");

      if (getUser) {
        var cart = JSON.parse(localStorage.getItem(getUser)) || [];
        let cartItem =
        {
          itemName: itName,
          itemImage: itImage
        };
        cart.push(cartItem);
        localStorage.setItem(getUser, JSON.stringify(cart));

        var getCheckLoginSpan = document.getElementById("checkLogInLabel");
        getCheckLoginSpan.innerText = "";

        var cartVal = document.getElementById("cartVal");
        if (getCookie(getUser) === undefined) {
          setCookie(getUser, 1);
          cartVal.innerText = parseInt(getCookie(getUser));
        }
        else {
          setCookie(getUser, parseInt(getCookie(getUser)) + 1);
          cartVal.innerText = parseInt(getCookie(getUser));
        }
      }
      else {
        var getCheckLoginSpan = document.getElementById("checkLogInLabel");
        getCheckLoginSpan.innerText = "You have to Sign in frist!!";
      }
    })
  }
})


/* Function to set the cart number in all pages */

function setCart() {
  let getUser = getCookie("userName");
  var cartVal = document.getElementById("cartVal");
  var signInModel = document.getElementById("signInModel");
  if (getCookie(getUser) == undefined) {
    cartVal.innerText = 0;
  }
  else {
    cartVal.innerText = parseInt(getCookie(getUser));
  }
  if (getCookie("userName") == undefined) {
    signInModel.innerText = "Hello, sign In";
  }
  else {
    signInModel.innerText = "Hello, " + getCookie("userName");
  }
}



/* Drawing Cart Page */
/* Function to draw the cart of every user */

function drawCart() {
  let getUser = getCookie("userName");
  let cartDivContainer = document.getElementById("cartDivContainer");
  let flag = 0;

  let getUsers = JSON.parse(localStorage.getItem(getUser));
  for (let key in getUsers) {
    cartDivContainer.innerHTML +=
      `<div class="card py-2"> 
      <div class="card-header">
        ${getUsers[key].itemName}
      </div>
          <div class="card-body">
            <img src='${getUsers[key].itemImage}' class='img-fluid img-thumbnail' width='200px' height='200px'>
            <button id='delete-button' value='${flag}' class='btn btn-danger float-right' onclick='deleteCartItem(this.value)'>delete</button>
          </div>
      </div>   
      <hr>`
    flag++;
  }
}

/* Function to Delete item from cart */

function deleteCartItem(val) {
  let getUser = getCookie("userName");
  let getUsers = JSON.parse(localStorage.getItem(getUser));
  getUsers.splice(val, 1);
  var newLocalVal = JSON.stringify(getUsers);
  setCookie(getUser, getUsers.length, 2 / 11 / 2020);
  localStorage.setItem(getUser, newLocalVal);
  location.assign("cartPage.html");
}
