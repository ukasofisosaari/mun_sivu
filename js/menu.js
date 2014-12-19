
$(document).ready(function() {
       
     //$(".right").html("me.html");    
    load_content(".right", "me.html");
    $('#me').css("background-color","#0969A2");

    var menu_div_id;
    $('.menu_div').click(function() {
        $('.menu_div').css("background-color","#64A8D1");
        $(this).css("background-color","#0969A2");
        menu_div_id = $(this).attr('id');
        if( menu_div_id === "me" )
        {
            //$(".right").html(me_html);
            load_content(".right", "me.html");
        }
        else if( menu_div_id === "projects" )
        {
            load_content(".right", "projects.html");
        }
        else if( menu_div_id === "resume" )
        {
            load_content(".right", "resume.html");
        }
        else if( menu_div_id === "contact" )
        {
            load_content(".right", "contact.html");
        }
        else if( menu_div_id === "server" )
        {
            //var data;
            //$.get( "http://hakala.dy.fi/cgi-bin/hello.cgi", function( data ) {
            //    $(".right").load(data);
            //});
            load_content(".right", "server.html");
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

var load_content = function(element, filename )
{
	$.get('/content.html?page='+filename, function(html_content){
		$(element).html(html_content)});
	});
}

var check_file_api = function()
{
    if (window.File && window.FileReader && window.FileList && window.Blob)
    {
        // Great success! All the File APIs are supported.
        return true;
    }
    else
    {
        load_content('.right', 'The File APIs are not fully supported in this browser.');
        return false;
    }    
}


