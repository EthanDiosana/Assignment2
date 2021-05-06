$(document).ready(function () {
  function retrievePosts() {
    $.ajax({
      url: '/get-posts',
      dataType: 'json',
      type: 'GET',
      success: function (data) {
        for (i = 0; i < data.length; i++) {
          document.getElementById("postsContainer").innerHTML
            += post_creator(data[i].Title, data[i].PostDate, data[i].Content, data[i].Rating, data[i].Author, data[i].PostID);
        }
        // then can use jquery to assign text to divs
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error: ", jqXHR, textStatus, errorThrown);
      }
    });
  }

  retrievePosts();

  $('#submit').on('click', function (event) {
    event.preventDefault();

    // encapsulate the data from the forms
    let formData = {
      title: $('#formTitle').val(),
      rating: $('#formRating').val(),
      date: $('#formDate').val(),
      username: $('#formUsername').val(),
      content: $('#formContent').val()
    }

    $('#formTitle').val("");
    $('#formRating').val("");
    $('#formDate').val("");
    $('#formUsername').val("");
    $('#formContent').val("");

    $.ajax({
      url: "/add-post",
      dataType: "text",
      type: "POST",
      data: formData,
      success: function (data) {
        // append new post to page
        document.getElementById("postsContainer").innerHTML
        += post_creator(formData.title, formData.date, formData.content, formData.rating, formData.author, formData.postid);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error: ", jqXHR, textStatus, errorThrown);
      }
    })
  })

  $("#postsContainer").on('click', 'button', function (event) {
    let postid = { id: $(this)[0].parentElement.id };
    $.ajax({
      url: "/remove-post",
      dataType: "text",
      type: "POST",
      data: postid,
      success: function (data) {
        document.getElementById(postid.id).remove();
      },
      error: function (error) {
        console.log(error);
      }
    })
  });

});

function post_creator(title, date, content, rating, author, postid) {
  let post_block = "<div id='" + postid + "' class='postContainer'>";
  post_block += "<div class='postTitle'>" + title + "</div>";
  post_block += "<div class='postRating'>" + rating + "</div>";
  post_block += "<div class='postDate'>" + date + "</div>";
  post_block += "<div class='postUsername'>" + author + "</div>";
  post_block += "<div class='postContent'>" + content + "</div>";
  post_block += "<button type='button' class='del'>Delete</button>";
  post_block += "</div>";
  return post_block;
}