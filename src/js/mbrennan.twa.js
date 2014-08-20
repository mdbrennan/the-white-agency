// global JS object
var TWA = function() {		
		var self, _lightBox;
	return{	
		init: function(){
			self=this;
			_lightBox = $('#lightbox');

			//load the lightbox up;
			self.openLightBox();

			$(".open-lightbox").click(self.openLightBox);	

		},

		progressBar : function(element, options){
			//console.log(element);
			//console.log(options);
			var bar = element.find('.bar');
			var status = element.find('.lb-status');

			$(element).on('click .close', {bar:bar}, self.closeLightBox);

			bar.width(options.start);
			element.fadeIn(function(){
				
				$(bar).animate({			   		
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

		resetLightbox : function(element){						
			
			element.find('.bar').removeClass('complete').width(0);
			element.find('.lb-status').removeClass('complete').html("Progress <em>0 %</em>");

		},

		closeLightBox: function(e){

			e.data.bar.stop();

			_lightBox.fadeOut('fast', function(){
				self.resetLightbox($(this));
			})
		},

		openLightBox: function(e){			
			$.getJSON('dist/js/data.json', function(data) {
				//console.log(data.data.lightbox);				
				self.progressBar(_lightBox, data.data.lightbox);	
			});
		}	
	 }
}();

$(function() {
	TWA.init();
});
