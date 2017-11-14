var password = document.getElementById("password")
var confirm_password = document.getElementById("confirm_password");
var email = document.getElementById("email");
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var check = /(.+)@(.+){2,}\.(.+){2,}/;



$(document).ready(function() {
  var usr = localStorage.getItem("signed");
  if (usr == "true") {

    $(".lin").hide();
    $(".lout").show();
  } else {
    $(".lin").show();
    $(".lout").hide();
  }
  $("#logout").click(function(event) {
    event.preventDefault();
    alert("You are now logged out");
    localStorage.setItem("signed", "false");
    $(".lin").show();
    $(".lout").hide();
  });

});



function logged() {

  if (password.value == "123" && email.value == "appu@qburst.com") {
    successPopup();
    if(Stay_signed_in.checked){
      localStorage.setItem("signed", "true");
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

      }
    }
  }
}

function successPopup() {

  password.setCustomValidity("You will be redirected shortly");
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