var password = document.getElementById("password")
var email = document.getElementById("email")
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

function contactus() {


    password.setCustomValidity("You will be redirected shortly");
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";


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
}