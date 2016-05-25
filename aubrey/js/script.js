/* global $*/

$(document).ready(function () {
  $(".fa-facebook").hover(function () {
    $("#talk-box").text("Let's be friends.");
  });
  $(".fa-twitter").hover(function () {
    $("#talk-box").text("Tweet at me.");
  });
  $(".fa-instagram").hover(function () {
    $("#talk-box").text("Pictures from my travels.");
  });
  $(".fa-tumblr").hover(function () {
    $("#talk-box").text("This is where I write things.");
  });
  $(".fa-linkedin").hover(function () {
    $("#talk-box").text("Link up with me.");
  });
  $(".fa-youtube").hover(function () {
    $("#talk-box").text("Subscribe!");
  });
  $(".fa-github").hover(function () {
    $("#talk-box").text("Let's git dangerous.");
  });
  $(".fa-codepen").hover(function () {
    $("#talk-box").text("Come see what I'm working on.");
  });
  $(".fa-fire").hover(function () {
    $("#talk-box").text("And one time, at code camp...");
  });
  $(".fa-facebook").hover(function () {
    $("#talk-box").text("Let's be friends.");
  });
  $(".fa-envelope").hover(function () {
    $("#talk-box").text("The old fashioned way.");
  });
  $(".fa").mouseleave(function () {
    $("#talk-box").html("&nbsp;");
  });





  happyMedium("https://medium.com/@michaelcharl.es/latest", function (data) {
  console.log(data);
    var postData = $.map(data.payload.posts, function (el) {
      return el;
    });

    var buildMediumPosts = function (data, count) {

      if (count === undefined) {
        count = 0;
      }

      var thisPost = data[count];

      if (thisPost && count < 5) {
        $(".medium-loading").hide();
        var $articleCard = $("<a href='https://medium.com/p/" + thisPost.id + "' class='article-card'></div>");
        var $postImage = $("<div class='article-media'></div>");
        var $postContent = $("<div class='article-content'></div>");
        $articleCard.append($postImage);
        $articleCard.append($postContent);
        var $articleDate = $("<p class='date'></p>");
        var pD = new Date(thisPost.firstPublishedAt);
        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        $articleDate.html("Published on " + monthNames[pD.getMonth()] + " " + pD.getDate() + ", " + pD.getFullYear());
        thisPost.previewContent.bodyModel.paragraphs.forEach(function (preview) {
          if (preview.type === 1) {
            var $postDesc = $("<p>" + preview.text + "</p>");
            $postContent.append($postDesc);
          }
          else if (preview.type === 13) {
            var $postSubtitle = $("<p>" + preview.text + "</p>");
            $postContent.append($postSubtitle);
          }
          else if (preview.type === 4) {
            $postImage.css({
              "background-image": "url('https://cdn-images-1.medium.com/max/500/" + preview.metadata.id + "')"
            });
          }
          else if (preview.type === 3) {
            var $postTitle = $("<h3>" + preview.text + "</h1>");
            $postContent.append($postTitle);
          }
          else if (preview.type === 2) {
            var $postPreviewTitle = $("<p class='preview-title'>" + preview.text + "</p>");
            $postContent.append($postPreviewTitle);
          }
          else {
            throw new Error("Unrecognized preview content type: " + preview.type);
          }
        });
        $postContent.append($articleDate);
        $("#medium-articles").append($articleCard);

        buildMediumPosts(data, count + 1);
      }
      else {
        var $moreLink = $("<div class='read-more-card'><a href='https://medium.com/@michaelcharl.es'>Read more articles on Medium.com</a></div>");
        $("#medium-articles").append($moreLink);
      }
    };

    buildMediumPosts(postData);
  });

});