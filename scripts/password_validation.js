var password = document.getElementById("password")
var confirm_password = document.getElementById("confirm_password");
var email = document.getElementById("email")
var modal = document.getElementById('myModal');
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];
var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

function validatePassword()
{  if(password.value != confirm_password.value) {
       confirm_password.setCustomValidity("Passwords Don't Match");
  } 
  else{ 
    if (reg.test(email) == false) 
            {
                alert('Invalid Email Address');
                return (false);
            }
    else{

  	 if(password.value =="" || confirm_password.value =="" || email.value ==""){
       confirm_password.setCustomValidity("Please fill in all fields");
  	  } 
  	  else{
            confirm_password.setCustomValidity("Passwords match");
  	  	    modal.style.display = "block";
            span.onclick = function() {
            modal.style.display = "none";
            }

            window.onclick = function(event) {
             if (event.target == modal) {
              modal.style.display = "none";
  	          }

            }
        }}
    }
}

