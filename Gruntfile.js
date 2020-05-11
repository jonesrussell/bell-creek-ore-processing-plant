/**
 * Gruntfile.js
 */
const serveStatic = require("serve-static");
const loadGruntTasks = require("load-grunt-tasks");

module.exports = function (grunt) {
  // Load grunt tasks automatically
  loadGruntTasks(grunt);

  // Configurable paths
  const config = {
    app: "src",
    dist: "dist",
  };

  // Define the configuration for all the tasks
  grunt.initConfig({
    config,
    eslint: {
      src: ["<%= config.app %>/scripts/{,*/}*.js"],
    },
    watch: {
      options: {
        livereload: true,
      },
      bower: {
        files: ["bower.json"],
        tasks: ["wiredep"],
      },
      js: {
        files: ["<%= config.app %>/scripts/{,*/}*.js"],
        tasks: ["eslint"],
        options: {
          livereload: true,
        },
      },
      jstest: {
        files: ["test/spec/{,*/}*.js"],
        tasks: ["test:watch"],
      },
      gruntfile: {
        files: ["Gruntfile.js"],
      },
      styles: {
        files: ["<%= config.app %>/styles/{,*/}*.css"],
        tasks: [
"newer:copy:styles",
"autoprefixer"
],
      },
      livereload: {
        options: {
          livereload: "<%= connect.options.livereload %>",
        },
        files: [
          "<%= config.app %>/{,*/}*.html",
          ".tmp/styles/{,*/}*.css",
          "<%= config.app %>/images/{,*/}*",
        ],
      },
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: "0.0.0.0",
      },
      livereload: {
        options: {
          middleware: (connect) => [
            serveStatic(".tmp"),
            connect().use(
              "/bower_components",
              serveStatic("./bower_components")
            ),
            serveStatic(config.app),
          ],
        },
      },
      test: {
        options: {
          open: false,
          port: 9001,
          middleware: (connect) => [
            serveStatic("test"),
            serveStatic(".tmp"),
            connect().use(
              "/bower_components",
              serveStatic("./bower_components")
            ),
            serveStatic(config.app),
          ],
        },
      },
      dist: {
        options: {
          base: "<%= config.dist %>",
          livereload: false,
        },
      },
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [
          {
            dot: true,
            src: [
              ".tmp",
              "<%= config.dist %>/*",
              "!<%= config.dist %>/.git*"
            ]
          }
        ]
      },
      server: ".tmp",
    },
    mocha: {
      all: {
        options: {
          run: true,
          urls: ["http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html"],
        },
      },
    },
    autoprefixer: {
      options: {
        browsers: [
          "> 0.5%",
          "last 2 versions",
          "Firefox ESR"
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: ".tmp/styles/",
            src: "{,*/}*.css",
            dest: ".tmp/styles/",
          }
        ]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//u,
        src: ["<%= config.app %>/index.html"],
      },
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            "<%= config.dist %>/scripts/{,*/}*.js",
            "<%= config.dist %>/styles/{,*/}*.css",
            "<%= config.dist %>/images/{,*/}*.*",
            "<%= config.dist %>/styles/fonts/{,*/}*.*",
            "<%= config.dist %>/*.{ico,png}",
          ],
        },
      },
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: "<%= config.dist %>",
      },
      html: "<%= config.app %>/index.html",
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          "<%= config.dist %>",
          "<%= config.dist %>/images",
          "<%= config.dist %>/styles",
        ],
        patterns: {
          // FIXME While usemin won't have full support for revved files we have
          // to put all references manually here
          js: [
            [
              /(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg|ico))/gmu,
              "Update the JS to reference our revved images",
            ],
          ],
        },
      },
      html: ["<%= config.dist %>/{,*/}*.html"],
      js: ["<%= config.dist %>/scripts/{,*/}*.js"],
      css: ["<%= config.dist %>/styles/{,*/}*.css"],
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: "<%= config.app %>/images",
            src: "{,*/}*.{gif,jpeg,jpg,png,ico}",
            dest: "<%= config.dist %>/images",
          }
        ]
      }
    },

    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: "<%= config.app %>/images",
            src: "{,*/}*.svg",
            dest: "<%= config.dist %>/images",
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
        },
        files: [
          {
            expand: true,
            cwd: "<%= config.dist %>",
            src: "{,*/}*.html",
            dest: "<%= config.dist %>",
          }
        ]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: "<%= config.app %>",
            dest: "<%= config.dist %>",
            src: [
              "*.{ico,png,txt}",
              "images/{,*/}*.webp",
              "{,*/}*.html",
              "styles/fonts/{,*/}*.*",
            ],
          },
          {
            src: "node_modules/apache-server-configs/dist/.htaccess",
            dest: "<%= config.dist %>/.htaccess",
          }
        ]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: "<%= config.app %>/styles",
        dest: ".tmp/styles/",
        src: "{,*/}*.css"
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: ["copy:styles"],
      test: ["copy:styles"],
      dist: [
        "copy:styles",
        "imagemin",
        "svgmin"
      ]
    }
  });

  grunt.registerTask(
    "serve",
    "start the server and preview your app, --allow-remote for remote access",
    (target) => {
      if (grunt.option("allow-remote")) {
        grunt.config.set("connect.options.hostname", "0.0.0.0");
      }
      if (target === "dist") {
        return grunt.task.run([
          "build",
          "connect:dist:keepalive"
        ]);
      }

      return grunt.task.run([
        "clean:server",
        "wiredep",
        "concurrent:server",
        "autoprefixer",
        "connect:livereload",
        "watch",
      ]);
    }
  );

  grunt.registerTask("test", (target) => {
    if (target !== "watch") {
      return grunt.task.run([
        "clean:server",
        "concurrent:test",
        "autoprefixer",
      ]);
    }

    return grunt.task.run([
"connect:test",
"mocha"
]);
  });

  grunt.registerTask("build", [
    "clean:dist",
    "wiredep",
    "useminPrepare",
    "concurrent:dist",
    "autoprefixer",
    "concat",
    "cssmin",
    "uglify",
    "copy:dist",
    "rev",
    "usemin",
    "htmlmin",
  ]);

  grunt.registerTask("default", [
"eslint",
"test",
"build"
]);
};
