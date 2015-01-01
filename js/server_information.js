$(document).ready(function() {
	$.getJSON('/server_information.json', function load_uptime(data){
		$('#OS_type').html("OS type: " + data.os_type);
        $('#OS_arch').html("OS architechture: " + data.os_arch);
        $('#server_cpu_model').html("CPU model: " + data.cpu.model);
        $('#server_cpu_speed').html("CPU core speed: " + data.cpu.speed +"MHz");
        $('#server_cpu_cores').html("Number of cores: " + data.cpu.cores);
        $('#server_uptime').html("Server: " + data.uptime +"min");
        $('#server_date').html("Date: " + data.unix_time)});
});
