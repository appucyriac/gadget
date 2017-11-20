var password = document.getElementById("password"),
 confirm_password = document.getElementById("confirm_password"),
 email = document.getElementById("email"),
 modal = document.getElementById('myModal'),
 span = document.getElementsByClassName("close")[0],
 check = /(.+)@(.+){2,}\.(.+){2,}/
 article_json ={"article_one":"Welcome to my ongoing impressions of the iPhone X. I've entered my third full day with the phone. Day 2 was mostly a blur of media hits, after a nearly sleepless night. Everything you're reading here is new as of the afternoon of Wednesday, November 1. I'm a pretty quick adopter of weird, new tech. The iPhone X isn't even that weird: it's really an evolved iPhone, with a sharp design and some new ways to use it. But I found, sure enough, that my first day with Apple's top-end phone was a learning process. Face ID and its log-in process. All the new swipes and gestures and button-presses. Learning to accept The Notch In The Screen.",
                "article_two":"It’s been a few months since the Samsung Galaxy S8 hit shelves, and it’s fair to say it’s changes phones a bit. Since Samsung unleashed its 2017 flagships the edge-to-edge design it started has spread. Now the Google Pixel 2 XL, iPhone X, LG V30 and Huawei Mate 10 Pro have it. But is the S8 still king?"};


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
   $.getJSON('https://appucyriac.github.io/gadget/json/content.json', function (data) {
      console.log(data);

        document.getElementsByClassName("first-article")[0].innerHTML=data.article_one;
        document.getElementsByClassName("second-article")[0].innerHTML=data.article_two;
    });
      
  //document.getElementsByClassName("first-article")[0].innerHTML=article_json.article_one;
  //document.getElementsByClassName("second-article")[0].innerHTML=article_json.article_two;
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


