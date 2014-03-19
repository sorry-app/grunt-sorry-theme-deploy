// Archiver and compression utilities.
var fs = require('fs');
var archiver = require('archiver');

// Initialize the uploader class.
exports.init = function (grunt, options) {

    // On error handler.
    var on_archive_error = function(err) {
      // Log the error which has happened.
      grunt.log.error(err);
      // Fail the task with the warning.
      grunt.fail.warn('Error when archiving your theme.');
    };

	// Upload the theme to the API.
	exports.bundle = function(callback) {
	    // Create an output stream for the file to be written to.
	    var output = fs.createWriteStream(options.destination);

		// Callback for when the output stream is closed.
		output.on('close', function() {
			// Log that the stream is closed.
			grunt.log.ok('Bundled theme ready for deployment (' + String(options.destination).cyan + ')');

			// Run the callback.
			callback(options.destination);
		});

	    // Callback for when archiving fails.
	    output.on('error', on_archive_error);

	    // Create a new archiver class for a zip file.
	    var archive = archiver('zip');

	    // Callback for when archiving fails.
	    archive.on('error', on_archive_error);

	    // Connect the output stream.
	    archive.pipe(output);

	    // Bulk add all the source files to the archive.
	    archive.bulk([{
	      expand: true, 
	      cwd: options.source,
	      src: ['**/*']
	    }]);

	    // Finallize the archive ready for creation.
	    archive.finalize();
	};

	// Return the classes exports.
	return exports;

};