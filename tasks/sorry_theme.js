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

  // Register the task.
  grunt.registerMultiTask('sorry_theme', 'A grunt task to automate the deployment of your status page themes to your Sorry account.', function() {

    // Force task into async mode and grab a handle to the "done" function.
    var done = this.async();

    // Create a file to use for the archive.
    var archive_path = new tmp.Dir().path + 'theme.zip';

    // On error handler.
    var on_archive_error = function(err) {
      // Log the error which has happened.
      grunt.log.error(err);
      // Fail the task with the warning.
      grunt.fail.warn('Error when archiving your theme.');
    };

    // Create an output stream for the file to be written to.
    var output = fs.createWriteStream(archive_path);

    // Callback for when the output stream is closed.
    output.on('close', function() {
      // Log that the stream is closed.
      grunt.log.ok('Bundled theme ready for deployment (' + String(archive_path).cyan + ')');

      // Complete the task.
      done();
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
      cwd: 'tasks/', 
      src: ['**/*']
    }]);

    // Finallize the archive ready for creation.
    archive.finalize();    

  });

};
