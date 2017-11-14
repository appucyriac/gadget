var password = document.getElementById("password");
var email = document.getElementById("email");
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

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

    if (password== "123" && email.value == "appu@qburst.com") {
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
        localStorage.setItem("signed", "true");

    } else {

        password.setCustomValidity("Invalid User ID/Password");
    }
}