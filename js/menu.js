$(document).ready(function() {
    $(".right").load("me.html");
    $('.menu_div').click(function() {
        $('.menu_div').css("background-color","#64A8D1");
        $(this).css("background-color","#0969A2");
        var id = $(this).attr('id');
        if( id === "me" )
        {
            $(".right").load("me.html");
        }
        else if( id === "resume" )
        {
            $(".right").load("resume.html");
        }
        else if( id === "contact" )
        {
            $(".right").load("contact.html");
        }
    });
});
