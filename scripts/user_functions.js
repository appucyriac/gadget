var password = document.getElementById("password"),
  confirm_password = document.getElementById("confirm_password"),
  email = document.getElementById("email"),
  popUp = document.getElementById("successPopUp"),
  span = document.getElementsByClassName("close")[0],
  check = /(.+)@(.+){2,}\.(.+){2,}/,
  likeCount = 0;

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
  $(".likeClassTwo").hide();
  $.getJSON('json/content.json', function(data) {
    //  data.articles[0].likeCount = parseInt(localStorage.getItem("like_count_one"));
    //  data.articles[1].likeCount = parseInt(localStorage.getItem("like_count_two"));
    document.getElementById("counterOne").innerHTML = data.articles[0].likeCount;
    document.getElementById("counterTwo").innerHTML = data.articles[1].likeCount;

  });

});



function logIn() {
  if (password.value == "123" && email.value == "appu@qburst.com") {
    successPopup();
    password.setCustomValidity("You will be redirected shortly");
    setTimeout(
      function() {
        window.location = '../index.html'
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
            window.location = '../index.html'
          }, 2500);
      }
    }
  }
}

function successPopup() {


  popUp.style.display = "block";
  span.onclick = function() {
    popUp.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == popUp) {
      popUp.style.display = "none";
    }
  }

}

function loadContent()

{
  var trimmed_content;
  $.getJSON('json/content.json', function(data) {
    console.log(data);
    $(".article-title-first")[0].innerHTML = data.articles[0].title;
    trimmed_content = trimContent(data.articles[0].article);
    $(".first-article")[0].innerHTML = trimmed_content; //only trimmed contents are shown on the homepage.
    $(".article-title-second")[0].innerHTML = data.articles[1].title;
    trimmed_content = trimContent(data.articles[1].article);
    $(".second-article")[0].innerHTML = trimmed_content;
  });
}

function loadAbout() {
  $.getJSON('../json/content.json', function(data) {
    console.log(data);
    $(".about-content")[0].innerHTML = data.articles[0].about;
  });
}

function loadFullContent(readMoreId) {
  $.getJSON('json/content.json', function(data) {
    console.log(data);

    $(".article-title-first")[0].innerHTML = data.articles[0].title;
    if (readMoreId == "read_more_first") {
      $(".first-article")[0].innerHTML = data.articles[0].article;
      $("#read_more_first").hide();
      $(".likeClassOne").show();
    }
    $(".article-title-second")[0].innerHTML = data.articles[1].title;
    if (readMoreId == "read_more_second") {
      $(".second-article")[0].innerHTML = data.articles[1].article;
      $("#read_more_second").hide();
      $(".likeClassTwo").show();
    }
  });
}

function trimContent(str) {
  var sub_str;
  sub_str = str.substring(0, 250);
  return sub_str;

}

function likeCounter(likeButtonId) {

  if (localStorage.getItem("signed") == "true") {
    debugger;
    if (likeButtonId == "likeButtonOne") {
      likeCount = parseInt(localStorage.getItem("like_count_one"));
      likeCount += 1;
      localStorage.setItem("like_count_one", parseInt(likeCount));
      $.getJSON('json/content.json', function(data) {
        console.log(data);
        data.articles[0].likeCount = likeCount;
        document.getElementById("counterOne").innerHTML = data.articles[0].likeCount;
      });
    }
    if (likeButtonId == "likeButtonTwo") {
      likeCount = parseInt(localStorage.getItem("like_count_two"));
      likeCount += 1;
      localStorage.setItem("like_count_two", likeCount);
      $.getJSON('json/content.json', function(data) {
        console.log(data);
        data.articles[1].likeCount = likeCount;
        document.getElementById("counterTwo").innerHTML = data.articles[1].likeCount;
      });
    }
  } else {
    successPopup();
  }
}

function postComment() {
  comment = document.getElementsByClassName("commentBox")[0].value,
    $.getJSON('json/content.json', function(data) {
      console.log(data);
      data.articles[0].comments = comment;
      $(".allComments")[0].innerHTML = data.articles[0].comments;
    });

}