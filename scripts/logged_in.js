var password = document.getElementById("password")
var email = document.getElementById("email")
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

function logged() {

    if (password.value == "123" && email.value == "appu@qburst.com") {
        password.setCustomValidity("Password Correct");
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }


    } else {

        password.setCustomValidity("Invalid User ID/Password");
    }
}