/*
 * grunt-sorry-theme
 * https://github.com/supporttime/grunt-sorry-theme
 *
 * Copyright (c) 2014 Robert Rawlins
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Load in your sorry credentials.
    // NOTE: NEVER CHECK YOUR CREDENTIALS INTO YOUR REPOSITORY.
    sorry: grunt.file.readJSON('sorry.json'),

    // Configuration to be run (and then tested).
    sorry_theme: {
      options: {
        username: '<%= sorry.username %>',
        password: '<%= sorry.password %>',
        page_id: 'my-first-status-page'
      },     
      valid_theme: {
        options: {
          source: 'test/fixtures/theme/'
        }
      },
      invalid_theme: {
        options: {
          source: 'test/fixtures/invalid_theme/'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-release');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'sorry_theme', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
