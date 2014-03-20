# grunt-sorry-theme-deploy

> A grunt task to automate the deployment of your status page themes to your Sorry account.
>
> This task takes your themes source code, bundles it up into a deployable zip and uploads it to your status page through the Sorry API.

## Getting Started
This plugin requires Grunt `~0.4.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sorry-theme-deploy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sorry-theme-deploy');
```

## The "sorry_theme_deploy" task

### Overview
In your project's Gruntfile, add a section named `sorry_theme_deploy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sorry_theme_deploy: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.username
Type: `String`

This is your username/email address which you have registered to your Sorry account.

#### options.password
Type: `String`

This is the password to match your username/email address.

#### options.destination
Type: `String`
Default Value: `/dist/theme.zip`

This is the location in which we'll store the bundled version of your theme before uploading it.

#### options.host
Type: `String`
Default Value: `https://api.sorryapp.com`

This is only applicable to Sorry development staff who wish to point the script at development and staging servers instead of the production endpoint.

### Usage Examples

#### Default Options

This example demonstrates loading your Sorry login details from another file, Where `sorry.json` is just a json key:value file like package.json.

**This is important because you should never check your Sorry credentials in to version control! Load them from an external file that is outside of the repo or excluded by .gitignore.**

```js
grunt.initConfig({

    // Load in your sorry credentials.
    // NOTE: NEVER CHECK YOUR CREDENTIALS INTO YOUR REPOSITORY.
    sorry: grunt.file.readJSON('sorry.json'),

    // Configuration to be run (and then tested).
    sorry_theme_deploy: {
      options: {
        username: '<%= sorry.username %>',
        password: '<%= sorry.password %>',
        page: 'YOUR STATUS PAGE NAME GOES HERE',
      },     
      your_target: {
        expand: true,
        cwd: 'src/',
        src: ['**/*']
      },
    }

});
```

You can also see from this config that we define the themes files as being in a directory named `src`. These files could be anywhere you like, but we always recommend this as a sensible default.

### Alternative ways of including your Sorry credentials

#### Environment variables

If you do not pass in a **username** and **password** with your config, `grunt-sorry-theme-deploy` will fallback to the following environment variables:

* `SORRY_USERNAME`
* `SORRY_PASSWORD`

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).