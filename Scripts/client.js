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
        += post_creator(formData.title, formData.date, formData.content, formData.rating, formData.username, formData.postid);
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

  $("#postsContainer").on('click', '.postContainer .att', function (e) {
    change_attribute();
    let edit_box = '<input type="text" id="update_data" name="update_data"></input>';
    let old_value = $(this)[0].innerHTML;
    $(this)[0].innerHTML = edit_box;
    document.getElementById("update_data").value = old_value;
    $(this)[0].className = $(this)[0].className.split(" ")[0];
  })

  $("#postsContainer").on('keypress', '#update_data', (e) => {
    console.log(e.which);
    if (e.which == 13)
      change_attribute();
  })

});

function post_creator(title, date, content, rating, author, postid) {
  let post_block = "<div id='" + postid + "' class='postContainer'>";
  post_block += "<div class='postTitle att'>" + title + "</div>";
  post_block += "<div class='postRating att'>" + rating + "</div>";
  post_block += "<div class='postDate att'>" + date + "</div>";
  post_block += "<div class='postUsername att'>" + author + "</div>";
  post_block += "<div class='postContent att'>" + content + "</div>";
  post_block += "<button type='button' class='del'>Delete</button>";
  post_block += "</div>";
  return post_block;
}

var attribute_type = ["postTitle", "postRating", "postDate", "postUsername", "postContent"];
var attribute_edit = ["Title", "Rating", "PostDate", "Author", "Content"];
function change_attribute() {
  let ud = document.getElementById("update_data");
    if (ud) {
      let att_type = attribute_edit[attribute_type.indexOf(ud.parentElement.className)];
      ud_pack = {data: [att_type, ud.value, ud.parentElement.parentElement.id]};
      $.ajax({
        url: "/update-post",
        dataType: "text",
        type: "POST",
        data: ud_pack,
        success: function (data) {
          // it worked.
        },
        error: function (error) {
          console.log(error);
        }
      })
      ud.parentElement.className += " att";
      ud.parentElement.innerHTML = ud.value;
    }
}