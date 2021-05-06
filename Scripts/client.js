$(document).ready(function () {
  function retrievePosts() {
    $.ajax({
      url: '/get-posts',
      dataType: 'json',
      type: 'GET',
      success: function (data) {
        //this should log all the rows from the posts table
        console.log(data);
        for (i = 0; i < data.length; i++) {
          
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

    $.ajax({
      url: "/add-post",
      dataType: "json",
      type: "POST",
      data: formData,
      success: function (data) {
        // log data to make sure the jquery above is properly grabbing it
        console.log(data);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error: ", jqXHR, textStatus, errorThrown);
      }
    })
  })

});