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

_Run this task with the `grunt sorry-theme-deploy` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide **or in some casses (such as page & host) be passed in as command line arguments**.

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

### Options (Required)

#### options.username
Type: `String`

This is your username/email address which you have registered to your Sorry account.

#### options.password
Type: `String`

This is the password to match your username/email address.

#### options.page or `--sory-page`
Type: `String`

This is ID of the page to which you wish to deploy your theme. You can find this in the address bar of your Sorry account when viewing your page. i.e. a URL of `http://app.sorryapp.com/pages/my-page` means your page ID is `my-page`.

### Options (Optional)

#### options.destination
Type: `String`
Default Value: `/dist/theme.zip`

This is the location in which we'll store the bundled version of your theme before uploading it.

#### options.host or `--sory-host`
Type: `String`
Default Value: `https://api.sorryapp.com`

This is only applicable to Sorry development staff who wish to point the script at development and staging servers instead of the production endpoint.

### Usage Example

#### Configuration

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
        password: '<%= sorry.password %>'
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

#### Running The Task

Now your options are configured your can deploy your theme to your chosen page. Whist you can put your page into the configuration above, to allow you to deploy to multiple pages we suggest using the command line argument `--sorry-page`

`grunt sorry-theme-deploy --sorry-page=my-page`

### Alternative ways of including your Sorry credentials

#### Environment variables

If you do not pass in a **username** and **password** with your config, `grunt-sorry-theme-deploy` will fallback to the following environment variables:

* `SORRY_USERNAME`
* `SORRY_PASSWORD`

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Versioning

For transparency and insight into our release cycle, and for striving to maintain backward compatibility, This project will be maintained under the Semantic Versioning guidelines as much as possible.

Releases will be numbered with the following format:

`<major>.<minor>.<patch>`

And constructed with the following guidelines:

* Breaking backward compatibility bumps the major (and resets the minor and patch)
* New additions without breaking backward compatibility bumps the minor (and resets the patch)
* Bug fixes and misc changes bumps the patch

For more information on SemVer, please visit <http://semver.org/>.

## Authors & Contributors

**Robert Rawlins**

+ <http://twitter.com/sirrawlins>
+ <https://github.com/SirRawlins>

**Robin Geall**

+ <http://twitter.com/robingeall>

## Copyright

Copyright & 2014 Support Time Limited. See [LICENSE](LICENSE) for details.