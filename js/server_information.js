$(document).ready(function() {
	$.getJSON('/server_uptime.json', function load_uptime(data){
		var uptime = data.uptime;
		var unix_time = data.unix_time;
		$('#uptime').HTML("Uptime: " + uptime +" Date: " + unix_time)});
});
