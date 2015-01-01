// server.js - NodeJS server for the ukas personal webpage

/* 
PArse uptime etc information from raspberry pi.
*/


// Load node modules
var fs = require('fs');
var sys = require('sys');
var http = require('http');

// Use node-static module to server chart for client-side dynamic graph
var nodestatic = require('node-static');
// Setup static server for current directory
var staticServer = new nodestatic.Server("/home/pi/mun_sivu/");


function sendJSON(response, json_data) {
     JSON.stringify(json_data);
	 response.writeHeader(200, { "Content-type": "application/json" });
	 response.end(JSON.stringify(json_data), "ascii");
}

function sendHTML(response, filename) {
	fs.readFile(filename, function (err, html) {
		if (err) {
			console.error(err);
			// Respond to the client
			response.writeHeader(err.status, err.headers);
			response.end('Error 404 - file not found');
		}
		response.writeHeader(200, {"Content-Type": "text/html"});  
		response.write(html);  
		response.end();
	});
}

// Parse server uptime. This function can be copied and used for other information from server.
function SendServerUptime(response){
	// Below read uptime
    fs.readFile('/proc/uptime', function sendServerInformation( err, buffer)
	{
		if (err){
			console.error(err);
			 // Respond to the client
			response.writeHeader(err.status, err.headers);
			response.end('Error 404 - file not found');
		}

		// Read data from file (using fast node ASCII encoding).
		var data = buffer.toString('ascii').split(" "); // Split by space

		// Extract uptime from string
		var uptime  = parseFloat(data[1])/60;

		// Round to one decimal place
		uptime = Math.round(uptime * 10) / 10;

		// Add date/time to to uptime
		var uptime_record = {
            unix_time: Date.now(),
            uptime: uptime
            };

        // Execute call back with data
        sendJSON(response, uptime_record);
   });
};

// Setup node http server
var server = http.createServer(
	// Our main server function
	function(request, response)
	{
		// Grab the URL requested by the client and parse any query options
		var url = require('url').parse(request.url, true);
		var pathfile = url.pathname;
        var query = url.query;
		console.log(pathfile)
		// If its content page request to server
		if (pathfile == '/content.html'){
			 // Check what content was requested.
			if (query.page){
				var filename = query.page;
				console.log('Content requested: ' + filename);
				sendHTML(response, filename);
			 }
			 else{
				console.log('Content requested but no filename specified');
			 }
			 return;
		}
		
        //NOTE: This handling can be used for other server information request, such as temperature sensors.
		// If its server uptime request to server
		if (pathfile == '/server_uptime.json'){
 
			 // Send a message to console log
			 console.log('Server information request');
			 // call selectTemp function to get data from database
			 SendServerUptime(response);
			return;
		}

		// test handle
		if (pathfile == '/test'){
			response.writeHeader(200, {'Content-Type': 'text/plain'});
			response.end('LOL');

			// Optionally log favicon requests.
			console.log('test: LOL');
			return;
		}

		else {
			// Print requested file to terminal
			console.log('Request from '+ request.connection.remoteAddress +' for: ' + pathfile);

			// Serve file using node-static			
			staticServer.serve(request, response, function (err, result) {
					if (err){
						// Log the error
						sys.error("Error serving " + request.url + " - " + err.message);
						
						// Respond to the client
						response.writeHeader(err.status, err.headers);
						response.end('Error 404 - file not found');
						return;
						}
					return;	
					})
		}
});
// Enable server
server.listen(8000);
// Log message
console.log('Server running at http://localhost:80');
