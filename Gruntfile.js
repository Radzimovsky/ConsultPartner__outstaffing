"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  var config = {
    pkg: grunt.file.readJSON("package.json"),

    clean: {
      build: ["build"]
    },

    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "src",
          src: [
            "img/**",
            "js/script.js",
            "index.html",
            "form.html",
            "blog.html",
            "post.html"
          ],
          dest: "build"
        }]
      }
    },

    less: {
      style: {
        files: {
          "build/css/style.css": "src/less/style.less"
        }
      }
    },

    postcss: {
      options: {
        processors: [
          require("autoprefixer")({browsers: "last 2 versions"})
        ]
      },
      style: {
        src: "build/css/*.css"
      }
    },

    cmq: {
      style: {
        files: {
          "build/css/style.css": ["build/css/style.css"]
        }
      }
    },

    csscomb: {
      style: {
        expand: true,
        src: ["build/css/style.css"]
      }
    },

    cssmin: {
      style: {
        files: {
          "build/css/style.min.css": ["build/css/style.css"]
        }
      }
    },

    uglify: {
      style: {
        files: {
          "build/js/script.min.js": ["build/js/script.js"]
        }
      }
    },

    imagemin: {
      images: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          src: ["build/img/**/*.{png, jpg, svg}"]
        }]
      }
    },

    watch: {
      style: {
        files: ["src/less/**/*.less"],
        tasks: ["less", "postcss", "cssmin"],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  };

  // // Не редактируйте эту строку
  // config = require("./.gosha")(grunt, config);

  grunt.initConfig(config);

  grunt.registerTask("build", [
    "clean",
    "copy",
    "less",
    "postcss",
    "cmq",
    "csscomb",
    "cssmin",
    // "uglify",
    // "imagemin"
  ]);

};
