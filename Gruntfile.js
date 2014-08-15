module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("mbrennan.twa.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		concat: {
			dist: {
				src: ["src/js/*.js"],
				dest: "dist/js/mbrennan.twa.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},
		
		compass: {
		    dist: {
		      options: {
		        sassDir: 'src/css',
		        cssDir: 'dist/css',
		        environment: 'production',
		        outputStyle:'compressed',
		        imagesDir:'src/images/',
		      }
		    }		    
		  },

		
		uglify: {
			my_target: {
				src: ["dist/js/mbrennan.twa.js"],
				dest: "dist/js/mbrennan.twa.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},		

		copy: {
		  main: {
		    files: [
		    {		     
		      expand: true,
		      src: ['src/images/*'],
		      dest: 'dist/images/',
		      filter: 'isFile',
		      flatten: true
		  	},

		    ]
		  }
		},	
			
		watch: {
		    files: ['src/**/*'],
		    tasks: ['default']
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");	
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks('grunt-contrib-compass'); 
	grunt.loadNpmTasks('grunt-contrib-copy'); 	
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["concat", "uglify", "compass", "copy"]);	

};
