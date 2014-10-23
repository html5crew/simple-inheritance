module.exports = (grunt)->
    grunt.initConfig
        pkg: grunt.file.readJSON('bower.json')

        release:
            options:
                file: 'bower.json'
                push: false
                pushTags: false
                npm: false

    grunt.loadNpmTasks 'grunt-release'

    grunt.registerTask 'default', []