var password = document.getElementById("password"),
  confirm_password = document.getElementById("confirm_password"),
  email = document.getElementById("email"),
  modal = document.getElementById('myModal'),
  span = document.getElementsByClassName("close")[0],
  check = /(.+)@(.+){2,}\.(.+){2,}/,
  comment =document.getElementsByClassName("commentBox")[0],
  likeCount =parseInt(localStorage.getItem("like_count"));
 // likeCount=0;

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
  $(".likeClassOne").hide();
  document.getElementById("counterOne").innerHTML = likeCount;
});



function logIn() {

  if (password.value == "123" && email.value == "appu@qburst.com") {
    successPopup();
    password.setCustomValidity("You will be redirected shortly");
    setTimeout(
      function() {
        window.location = 'https://appucyriac.github.io/gadget/index.html'
      }, 2500);
    if (stay_signed_in.checked) {
      localStorage.setItem("signed", "true");
    } else {
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
        setTimeout(
          function() {
            window.location = 'https://appucyriac.github.io/gadget/index.html'
          }, 2500);
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

}

function loadContent()

{
  var trimmed_content;
  $.getJSON('https://appucyriac.github.io/gadget/json/content.json', function(data) {
    console.log(data);
    document.getElementsByClassName("article-title-first")[0].innerHTML = data.title_one;
    trimmed_content = trimContent(data.article_one);
    document.getElementsByClassName("first-article")[0].innerHTML = trimmed_content;
    document.getElementsByClassName("article-title-second")[0].innerHTML = data.title_two;
    trimmed_content = trimContent(data.article_two);
    document.getElementsByClassName("second-article")[0].innerHTML = trimmed_content;
  });
}

function loadAbout() {
  $.getJSON('https://appucyriac.github.io/gadget/json/content.json', function(data) {
    console.log(data);
    document.getElementsByClassName("about-content")[0].innerHTML = data.about;
  });
}

function loadFullContent(readMoreId) {
  $.getJSON('https://appucyriac.github.io/gadget/json/content.json', function(data) {
    console.log(data);
    document.getElementsByClassName("article-title-first")[0].innerHTML = data.title_one;
    if (readMoreId == "read_more_first") {
      document.getElementsByClassName("first-article")[0].innerHTML = data.article_one;
      $("#read_more_first").hide();
      $(".likeClassOne").show();
    }
    document.getElementsByClassName("article-title-second")[0].innerHTML = data.title_two;
    if (readMoreId == "read_more_second") {
      document.getElementsByClassName("second-article")[0].innerHTML = data.article_two;
      $("#read_more_second").hide();
    }
  });
}

function trimContent(str) {
  var sub_str;
  sub_str = str.substring(0, 250);
  return sub_str;

}

function likeCounter() {
  if (localStorage.getItem("signed") == "true") {
    likeCount += 1;
    localStorage.setItem("like_count",likeCount);
    document.getElementById("counterOne").innerHTML = likeCount;
  } else {
    successPopup();
  }
}

function postComment()
{
 localStorage.setItem("comments",comment);
  document.getElementsByClassName("comments")[0].innerHTML=comment;
}