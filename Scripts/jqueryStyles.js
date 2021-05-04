$(document).ready(function() {


    $(".newsTitle").hover(
        function() {
            $(".newsTitle").css("text-decoration", "underline");
        },
        function() {
            $(".newsTitle").css("text-decoration", "none");
        }
    )

    $("#navBar").children().eq(0).hover(
        function() {
            $("#navBar").children().eq(0).css("background-color", "rgb(160, 151, 139)");
        },
        function() {
            $("#navBar").children().eq(0).css("background-color", "antiquewhite");
        }
    )

    $("#navBar").children().eq(1).hover(
        function() {
            $("#navBar").children().eq(1).css("background-color", "rgb(160, 151, 139)");
        },
        function() {
            $("#navBar").children().eq(1).css("background-color", "antiquewhite");
        }
    )
    
    $("#navBar").children().eq(2).hover(
        function() {
            $("#navBar").children().eq(2).css("background-color", "rgb(160, 151, 139)");
        },
        function() {
            $("#navBar").children().eq(2).css("background-color", "antiquewhite");
        }
    )

    $("#navBar").children().eq(3).hover(
        function() {
            $("#navBar").children().eq(3).css("background-color", "rgb(160, 151, 139)");
        },
        function() {
            $("#navBar").children().eq(3).css("background-color", "antiquewhite");
        }
    )

})