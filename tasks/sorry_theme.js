/*
 * grunt-sorry-theme
 * https://github.com/supporttime/grunt-sorry-theme
 *
 * Copyright (c) 2014 Robert Rawlins
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  // Include the temporary dir lib.
  var tmp = require('temporary');

  // Archiver and compression utilities.
  var fs = require('fs');
  var archiver = require('archiver');
  var rest = require('restler');

  // Register the task.
  grunt.registerMultiTask('sorry_theme', 'A grunt task to automate the deployment of your status page themes to your Sorry account.', function() {

    // Force task into async mode and grab a handle to the "done" function.
    var done = this.async();

    // Default configuration options.
    // TODO: Don't describe these here - have the task fail if they are not defined.
    var options = this.options({
      // Default path for the theme is in the src directory.
      source: 'src/',
      // Default api endpoint is on the production environment.
      host: 'api.sorryapp.com',
      post: 80
    });

    // Create a file to use for the archive.
    var archive_path = new tmp.Dir().path + 'theme.zip';

    // On error handler.
    var on_archive_error = function(err) {
      // Log the error which has happened.
      grunt.log.error(err);
      // Fail the task with the warning.
      grunt.fail.warn('Error when archiving your theme.');
    };

    // Method to get the API endpoint.
    var api_endpoint = function () {
      // Compile the endpoint from the options.
      return 'http://' + options.username + ':' + options.password + '@' + options.host + ':' + options.port + '/1/pages/' + options.page_id + '/theme';
    };

    // Create an output stream for the file to be written to.
    var output = fs.createWriteStream(archive_path);

    // Callback for when the output stream is closed.
    output.on('close', function() {
      // Log that the stream is closed.
      grunt.log.ok('Bundled theme ready for deployment (' + String(archive_path).cyan + ')');

      // Upload the theme to the API.

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

            // Complete the task.
            done();
          });
        }
      });      
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

  });

};
