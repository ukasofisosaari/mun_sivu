$(document).ready(function() {
    $(".right").load("me.html");
    $('#me').css("background-color","#0969A2");

    var menu_div_id;
    $('.menu_div').click(function() {
        $('.menu_div').css("background-color","#64A8D1");
        $(this).css("background-color","#0969A2");
        menu_div_id = $(this).attr('id');
        if( menu_div_id === "me" )
        {
            $(".right").load("me.html");
        }
        else if( menu_div_id === "projects" )
        {
            $(".right").load("projects.html");
        }
        else if( menu_div_id === "resume" )
        {
            $(".right").load("resume.html");
        }
        else if( menu_div_id === "contact" )
        {
            $(".right").load("contact.html");
        }
        else if( menu_div_id === "server" )
        {
            //var data;
            //$.get( "http://hakala.dy.fi/cgi-bin/hello.cgi", function( data ) {
            //    $(".right").load(data);
            //});
            $(".right").load("server.html");
        }
    });
    $('.menu_div').mouseover(function() {
        $(this).css("background-color","#0969A2");
    });
    $('.menu_div').mouseleave(function() {
        if( menu_div_id != $(this).attr('id'))
        {
            $(this).css("background-color","#64A8D1");
        }
    });
    
});
