var password = document.getElementById("password")
var email = document.getElementById("email")
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var usr = localStorage.getItem("logged");

$(document).ready(function() {

    if (usr == "true") {
     
     lin.style.display="none";
     lout.style.display="block";
    }
    else{
      lin.style.display="block";
     lout.style.display="none";   
    }


});
$("#logout").click(function() {
  alert( "You are now logged out" );
  localStorage.setItem("logged", "false");
});


function logged() {
    if (usr == "true") {

        password.setCustomValidity("You are already logged in. Redirecting to home page..");
        setTimeout(
            function() {
                window.location = 'file:///home/appu/Documents/gadget/index.html';
            }, 2500);
    } else if (password.value == "123" && email.value == "appu@qburst.com") {
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
        localStorage.setItem("logged", "true");

    } else {

        password.setCustomValidity("Invalid User ID/Password");
    }
}