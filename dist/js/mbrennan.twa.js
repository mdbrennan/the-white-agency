/*
 *  Matthew Brennan The White Agency Test - v1.0.0
 *  Front End Dev Test
 *  http://github.com/mdbrennan/the-white-agency/
 *
 *  Made by Matthew Brennan
 *  Under MIT License
 */
// global JS object
var TWA = function() {		
		var self;
	return{	
		init: function(){
			self=this;

			//load the lightbox up;
			self.openLightBox();
			$(".open-lightbox").click(self.openLightBox);	

		},

		progressBar : function(element, options){
			//console.log(element);
			//console.log(options);
			var bar = element.find('.bar');
			var status = element.find('.lb-status');

			$(element).on('click .close', self.closeLightBox);

			bar.width(options.start);
			element.fadeIn(function(){
				
				$(bar).animate({
			   		opacity: 1,
			   		width: options.finish+'%'			   				   	
			 	},
				{
					duration:options.duration,
			   		progress: function(a, p, c ) {
			     		//console.log( 100 * p + "%" );
			     		var percentage = Math.round(100 * p)+"%";
			     		status.find('em').html(percentage);
			   		},
			   		complete: function(){
			   			bar.addClass('complete');
			   			status.addClass('complete').html("Task is 100% completed <em>&#10004;</em>");
			   		}
			 	}
			 	);
			})		
		},

		closeLightBox: function(){
			$("#lightbox").fadeOut('fast', function(){
				$(this).find('.bar').removeClass('complete');
				$(this).find('.lb-status').removeClass('complete').html("Progress <em>0 %</em>");
			})
		},

		openLightBox: function(e){			
			$.getJSON('dist/js/data.json', function(data) {
				//console.log(data.data.lightbox);				
				self.progressBar($('#lightbox'), data.data.lightbox);	
			});
		}	
	 }
}();

$(function() {
	TWA.init();
});
