var password = document.getElementById("password")
var email = document.getElementById("email")
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

function logged(){

        if(password.value=="" || email.value=="")
        {
        	password.setCustomValidity("Fill in all fields");
   
        }
        else{

            modal.style.display = "block";
            span.onclick = function() {
            modal.style.display = "none";
            }

            window.onclick = function(event) {
             if (event.target == modal) {
              modal.style.display = "none";
  	          }
    }
 }
}
