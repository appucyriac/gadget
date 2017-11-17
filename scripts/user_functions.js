var password = document.getElementById("password"),
 confirm_password = document.getElementById("confirm_password"),
 email = document.getElementById("email"),
 modal = document.getElementById('myModal'),
 btn = document.getElementById("myBtn"),
 span = document.getElementsByClassName("close")[0],
 check = /(.+)@(.+){2,}\.(.+){2,}/;
var json = $.getJSON({'url': "https://appucyriac.github.io/gadget/json/test.json", 'async': false});

$(document).ready(function() {
  var usr = localStorage.getItem("signed");
  if (usr == "true") {

    $(".login-buttons").hide();
    $(".logged-buttons").show();
  } else {
    $(".login-buttons").show();
    $(".logged-buttons").hide();
  }
  $("#logout").click(function(event) {
    event.preventDefault();
    alert("You are now logged out");
    localStorage.setItem("signed", "false");
    $(".login-buttons").show();
    $(".logged-buttons").hide();
  });
  json = JSON.parse(json.responseText); 
  document.getElementsByClassName("article-content")[0].innerHTML=json.text;
});



function logIn() {

  if (password.value == "123" && email.value == "appu@qburst.com") {
    successPopup();
    password.setCustomValidity("You will be redirected shortly");
    if(stay_signed_in.checked){
      localStorage.setItem("signed", "true");
    }
    else{
          $(".login-buttons").hide();
          $(".logged-buttons").show();
    }

  } else {

    password.setCustomValidity("Invalid User ID/Password");
  }
}

function validatePassword() {


  if (check.test(email.value) == false) {
    email.setCustomValidity("Invalid email");
    return (false);
  } else {

    if (password.value != confirm_password.value) {
      confirm_password.setCustomValidity("Passwords Don't Match");
    } else {


      if (password.value == "" || confirm_password.value == "" || email.value == "") {
        confirm_password.setCustomValidity("Please fill in all fields");
      } else {
        successPopup();
        password.setCustomValidity("You will be redirected shortly");
      }
    }
  }
}

function successPopup() {

  
  modal.style.display = "block";
  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  setTimeout(
    function() {
      window.location = 'https://appucyriac.github.io/gadget/index.html'
    }, 2500);
}


