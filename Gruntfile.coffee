module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    coffee:
      compile:
          files:
            "js/app.js" : "app/**/*.coffee"
    bower: 
      install: {}
    connect:
      server:
        options:
          port: 9000
    concat : 
      vendors : 
        src : [
          "lib/jquery/jquery.min.js"
          "lib/backbone/backbone-min.js"
          "lib/handlebars/handlebars.js"
        ]
        dest : "js/vendors.js"
    watch : 
      compile_coffee:
        files: ["app/**/*.coffee"]
        tasks: ["coffee"]

  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-bower-task"
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.registerTask "build", ["coffee", "bower:install", "concat:vendors"]
  grunt.registerTask "run", ["connect", "watch"]