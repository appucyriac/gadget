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
  $(".likeClass").hide();
  $.getJSON('json/content.json', function(data) {
    debugger;
    if (localStorage.getItem("content") == null) {
      localStorage.setItem("content", JSON.stringify(data));
    } else {
      var jsonData = JSON.parse(localStorage.getItem("content"));
      
      for (var i = 0; i < data.articles.length; i++) {
        $(".counter")[i].innerHTML = jsonData.articles[i].likeCount;
        for (var j = 0; j < jsonData.articles[i].comments.length; j++) {
          debugger;
          $(".allComments")[i].innerHTML += jsonData.articles[i].comments[j].comment + ", ";
        }
      }
    }

  });

});



function signInValidation() {
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

function signUpValidation() {

  if (password.value == "" || confirm_password.value == "" || email.value == "") {
    confirm_password.setCustomValidity("Please fill in all fields");
  } else {
    if (check.test(email.value) == false) {
      email.setCustomValidity("Invalid email");
      return (false);
    } else {
      if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match");
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

function loadContent() {
  var trimmed_content;
  $.getJSON('json/content.json', function(data) {
    console.log(data);
    for (var i = 0; i < data.articles.length; i += 1) {
      $(".article-title")[i].innerHTML = data.articles[i].title;
      trimmed_content = trimContent(data.articles[i].article);
      $(".article-content")[i].innerHTML = trimmed_content;
    } //only trimmed contents are shown on the homepage
  });
}

function loadFullContent(readMoreButtonNumber) {
  $.getJSON('json/content.json', function(data) {
    console.log(data);

    $(".article-title")[readMoreButtonNumber].innerHTML = data.articles[readMoreButtonNumber].title;
    $(".article-content")[readMoreButtonNumber].innerHTML = data.articles[readMoreButtonNumber].article;
    $(".readMoreButton")[readMoreButtonNumber].style.display = 'none';
    $(".commentHeader")[readMoreButtonNumber].style.display = 'block';
    $(".allComments")[readMoreButtonNumber].style.display = 'block';
    $(".postButton")[readMoreButtonNumber].style.display = 'block';
    $(".likeButton")[readMoreButtonNumber].style.display = 'block';
    $(".commentBox")[readMoreButtonNumber].style.display = 'block';
    $(".likeCount")[readMoreButtonNumber].style.display = 'block';


  });
}

function trimContent(str) {
  var sub_str;
  sub_str = str.substring(0, 250);
  return sub_str;

}

function likeCounter(likeButtonNumber) {

  if (localStorage.getItem("signed") == "true") {
    var retrievedObject = JSON.parse(localStorage.getItem("content"));
    likeCount = retrievedObject.articles[likeButtonNumber].likeCount;
    likeCount += 1;
    retrievedObject.articles[likeButtonNumber].likeCount = likeCount;
    localStorage.setItem("content", JSON.stringify(retrievedObject));
    $.getJSON('json/content.json', function(data) {
      console.log(data);
      data.articles[likeButtonNumber].likeCount = likeCount;
      document.getElementsByClassName("counter")[likeButtonNumber].innerHTML = likeCount;
    });

  } else {
    successPopup();
  }
}

function postComment(commentBoxNumber) {
  if (localStorage.getItem("signed") == "true") {
    comment = document.getElementsByClassName("commentBox")[commentBoxNumber].value;
    var retrievedObject = JSON.parse(localStorage.getItem("content"));
    $.getJSON('json/content.json', function(data) {
      console.log(data);
      var newComment = {
        "comment": comment
      };
      newComment = JSON.stringify(newComment);
      debugger;
      retrievedObject.articles[commentBoxNumber].comments.push(JSON.parse(newComment));
      localStorage.setItem("content", JSON.stringify(retrievedObject));
      $(".allComments")[commentBoxNumber].innerHTML += " " + comment;

    });
  } else {
    successPopup();
  }

}