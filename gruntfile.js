
var helpers = require('./gruntHelpers');

module.exports = function (grunt) {

	grunt.initConfig({

		watch: {
			socketServer: {
				files: ['socketServer/**/*.hbs'],
				tasks: ['emberTemplates'],
				options: {
					spawn: false
				}
			}
		},

		handlebars: {
			socketServer: {
				options: {
					amd: true,
					processName: helpers.makeTemplateName,
					processContent: function (content) {
						content = content.replace(/(\r\n|\t|\s+\s)/gmi, '');
						return content;
					}
				},
				files: {
					'socketServer/public/js/templates.js': ['socketServer/public/templates/**.hbs']
				}
			}
		},

		emberTemplates: {
		  compile: {
		    options: {
				amd: true,
		    	templateBasePath: /socketServer\/public\/templates\//ig
		    },
		    files: {
				'socketServer/public/js/templates.js': ['socketServer/public/templates/**.hbs']
		    }
		  }
		}

	});

	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-ember-templates');
	grunt.loadNpmTasks('grunt-contrib-watch');

}