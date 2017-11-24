var password_field = $("#passwordField")[0],
  confirm_password_field = $("#confirmPasswordField")[0],
  email_field = $("#emailField")[0],
  message_popup = $("#messagePopUp")[0],
  close_button = $(".closeButton")[0],
  email_regex = /(.+)@(.+){2,}\.(.+){2,}/,
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
  $(".readLess").hide();
  if (window.location.href == "http://10.9.12.111/gadget/index.html") {
    $.getJSON("/gadget/json/content.json", function(data) {
      if (localStorage.getItem("content") == null) {
        localStorage.setItem("content", JSON.stringify(data));
      } else {
        var jsonData = JSON.parse(localStorage.getItem("content"));

        for (var i = 0; i < data.articles.length; i++) {
          $(".counter")[i].innerHTML = jsonData.articles[i].likeCount;
          for (var j = 0; j < jsonData.articles[i].comments.length; j++) {
            if (jsonData.articles[i].comments[j].comment != null) {
              var listNode = document.createElement("li");
              var commentNode = document.createTextNode(jsonData.articles[i].comments[j].comment);
              listNode.appendChild(commentNode);
              $(".allComments")[i].append(listNode);
            }
          }
        }
      }
    });
  }
});

function validateSignIn() {
  if (password_field.value == "123" && email_field.value == "appu@qburst.com") {
    showPopUp();
    password_field.setCustomValidity("You will be redirected shortly");
    setTimeout(
      function() {
        window.location = "../index.html"
      }, 2500);
    if (stay_signed_in.checked) {
      localStorage.setItem("signed", "true");
    } else {
      $(".login-buttons").hide();
      $(".logged-buttons").show();
    }
  } else {
    password_field.setCustomValidity("Invalid User ID/Password");
  }
}

function validateSignUp() {
  if (password_field.value == "" || confirm_password_field.value == "" || email_field.value == "") {
    confirm_password_field.setCustomValidity("Please fill in all fields");
  } else {
    if (email_regex.test(email_field.value) == false) {
      email_field.setCustomValidity("Invalid email");
      return (false);
    } else {
      if (password_field.value != confirm_password_field.value) {
        confirm_password_field.setCustomValidity("Passwords Don't Match");
      } else {
        showPopUp();
        password_field.setCustomValidity("You will be redirected shortly");
        setTimeout(
          function() {
            window.location = "../index.html"
          }, 2500);
      }
    }
  }
}

function contactGadgetFreak() {
  showPopUp();
  setTimeout(
    function() {
      window.location = "../index.html"
    }, 2500);

}

function showPopUp() {
  var close_button = $(".closeButton")[0];
  var message_popup = $("#messagePopUp")[0];
  message_popup.style.display = "block";
  close_button.onclick = function() {
    message_popup.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == message_popup) {
      message_popup.style.display = "none";
    }
  }

}

function loadContent() {
  var trimmed_content;
  $.getJSON("json/content.json", function(data) {
    for (var i = 0; i < data.articles.length; i += 1) {
      $(".article-title")[i].innerHTML = data.articles[i].title;
      trimmed_content = trimContent(data.articles[i].article);
      $(".article-content")[i].innerHTML = trimmed_content;
    } //only trimmed contents are shown on the homepage
  });
}

function loadFullContent(readMoreButtonNumber) {
  $.getJSON("json/content.json", function(data) {
    $(".article-title")[readMoreButtonNumber].innerHTML = data.articles[readMoreButtonNumber].title;
    $(".article-content")[readMoreButtonNumber].innerHTML = data.articles[readMoreButtonNumber].article;
    $(".readMore")[readMoreButtonNumber].style.display = "none";
    $(".commentHeader")[readMoreButtonNumber].style.display = "block";
    $(".allComments")[readMoreButtonNumber].style.display = "block";
    $(".postButton")[readMoreButtonNumber].style.display = "block";
    $(".likeButton")[readMoreButtonNumber].style.display = "block";
    $(".commentBox")[readMoreButtonNumber].style.display = "block";
    $(".likeCount")[readMoreButtonNumber].style.display = "block";
  });
  $(".readLess")[readMoreButtonNumber].style.display = "block";
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
    $.getJSON("json/content.json", function(data) {
      data.articles[likeButtonNumber].likeCount = likeCount;
      document.getElementsByClassName("counter")[likeButtonNumber].innerHTML = likeCount;
    });
  } else {
    showPopUp();
  }
}

function postComment(commentBoxNumber) {
  if (localStorage.getItem("signed") == "true") {
    comment = $(".commentBox")[commentBoxNumber].value;
    if (comment == "") {
      $(".commentBox")[commentBoxNumber].setCustomValidity("Please type some comments");
    } else {
      var retrievedObject = JSON.parse(localStorage.getItem("content"));
      $.getJSON("json/content.json", function(data) {
        var newComment = {
          "comment": comment
        };
        newComment = JSON.stringify(newComment);
        retrievedObject.articles[commentBoxNumber].comments.push(JSON.parse(newComment));
        localStorage.setItem("content", JSON.stringify(retrievedObject));
        var listNode = document.createElement("li");
        var commentNode = document.createTextNode(comment);
        listNode.appendChild(commentNode);
        $(".allComments")[commentBoxNumber].append(listNode);
      });
    }
  } else {
    showPopUp();
  }

}

function loadLessContent(readLessNumber) {
  loadContent();
  $(".likeClass").hide();
  $(".readLess")[readLessNumber].style.display = "none";
  $(".readMore")[readLessNumber].style.display = "block";
}