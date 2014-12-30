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
var staticServer = new nodestatic.Server(".");

// Parse server information such as uptime etc
function parseServerUptime(callback){
	// Below read uptime
    fs.readFile('/proc/uptime', function sendUptime(err, buffer)
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
      var temp  = parseFloat(data[1])/60;

      // Round to one decimal place
      temp = Math.round(temp * 10) / 10;

      // Add date/time to to uptime
   	var data = {
            uptime_record:[{
            unix_time: Date.now(),
            uptime: temp
            }]};

      // Execute call back with data
      callback(data);
   });
};

// Parse server information such as uptime etc
function parseServerInformation(callback){
	// Below read uptime
    fs.readFile('/proc/uptime', function sendServerInformation(err, buffer)
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
		var temp  = parseFloat(data[1])/60;

		// Round to one decimal place
		temp = Math.round(temp * 10) / 10;

		// Add date/time to to uptime
		var uptime_record = {
            unix_time: Date.now(),
            uptime: temp
            };

        // Execute call back with data
        callback(uptime_record);
   });
};

function sendJSON(response, data) {
	 response.writeHeader(200, { "Content-type": "application/json" });		
	 response.end(JSON.stringify(data), "ascii");
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



// Setup node http server
var server = http.createServer(
	// Our main server function
	function(request, response)
	{
		// Grab the URL requested by the client and parse any query options
		var url = require('url').parse(request.url, true);
		var pathfile = url.pathname;
        var query = url.query;

		// If its server request
		if (pathfile == '/server_uptime.json'){
 
			 // Send a message to console log
			 console.log('Server information request');
			 // call selectTemp function to get data from database
			 parseServerInformation(response, sendJSON());
			return;
		}
		
		// If its server request
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
		
		// If its server request
		if (pathfile == '/server_information.json'){
 
			 // Send a message to console log
			 console.log('Server information request');
			 // call selectTemp function to get data from database
			 parseServerInformation(response, sendJSON(data));
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
      
		// Handler for favicon.ico requests
		if (pathfile == '/favicon.ico'){
			response.writeHeader(200, {'Content-Type': 'image/x-icon'});
			response.end();

			// Optionally log favicon requests.
			console.log('favicon requested');
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
console.log('Server running at http://localhost:8000');
