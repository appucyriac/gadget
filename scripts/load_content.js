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
  $.getJSON("/gadget/json/content.json", function(data) {
    debugger;
    if (localStorage.getItem("content") == null) {
      localStorage.setItem("content", JSON.stringify(data));
    } else {
      var jsonData = JSON.parse(localStorage.getItem("content"));

      for (var i = 0; i < data.articles.length; i++) {
        $(".counter")[i].innerHTML = jsonData.articles[i].likeCount;
        for (var j = 0; j < jsonData.articles[i].comments.length; j++) {
          debugger;
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
});
