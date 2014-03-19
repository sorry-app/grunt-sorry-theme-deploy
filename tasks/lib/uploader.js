// Filesystem and Restler http library.
var fs = require('fs');
var rest = require('restler');

// Initialize the uploader class.
exports.init = function (grunt, options) {

    // Method to get the API endpoint.
    var api_endpoint = function () {
      // Compile the endpoint from the options.
      return 'http://' + options.username + ':' + options.password + '@' + options.host + ':' + options.port + '/1/pages/' + options.page_id + '/theme';
    };

	// Upload the theme to the API.
	exports.upload = function (archive_path, callback) {
	  // Get file size (necessary for multipart upload)
	  fs.stat(archive_path, function(err, stats) {
	    // See if stating the file have any erros.
	    if (err) {
	      // Fail gracefully with the error.
	      grunt.fail.warn('Error: ' + err);

	    // If no error occurs and it confirms the file exists.
	    } else if (stats.isFile()) {
	      // Log that we're about to start the uplading.
	      grunt.log.writeln('Uploading your theme: ' + archive_path);

	      // HTTP request
	      rest.request(api_endpoint(), {
	        // Stadard multipart HTTP POST to the api.
	        method: 'PUT',
	        multipart: true,
	        data: {
	          // Attach the zipfile we've just created.
	          zip: rest.file(archive_path, null, stats.size, null, 'application/zip')
	        }
	      // Callback once the upload is complete.
	      }).on('complete', function(data, response) {
	        // Check the response code of the request for various outcomes.
	        // TODO: Cope with 404 for wrong page id's.
	        // TODO: Cope with 401 for wrong authentication details.
	        // TODO: Cope with JSON validation error collection output
	        // TODO: Cope when no connect could be made, is complete task best option?
	        if (response.statusCode === 200) {
	          // Upload was succesfull.
	          // Log that things were a success.
	          grunt.log.ok('Upload successful of:' + archive_path);
	        } else {
	          // The upload was not a success.
	          // Fail gracefully with some error information.
	          // TODO: Log more details about the request, so we can see a stack trace etc if one exists.
	          grunt.fail.warn('Failed uploading:' + archive_path + '(status code: ' + response.statusCode + ')');
	        }

	        // Run the callback method.
	        callback();
	      });
	    }
	  });
	};

	// Return the classes exports.
	return exports;

};