'use strict';

(function (){
	var $ = require('jquery'),
	imagesLoaded = require('imagesloaded'),
	

	psAjax = {

		ajaxLinkClass 	: '.psAjax',
		loadingClass 	: 'loading',
		siteWrap 		: 'siteWrap',
		ajaxLoading 	: 'ajaxLoading',
		bodyAjaxLoading : 'bodyAjaxLoading',

		currentLoadingState : 0,
		loadingTimeout 	: null,

		defaultAjaxLoadingMin : 1000, //in ms

		doneLoadingPage : function() {

			$('.' + psAjax.loadingClass).removeClass(psAjax.loadingClass);
			var event = new CustomEvent("psPageLoaded");
			window.dispatchEvent(event);

		},

		init: function() {

			imagesLoaded.makeJQueryPlugin( $ );

			$(document).ready(function(){

				psAjax.createListeners();

				history.pushState({target:'.' + psAjax.siteWrap, 'href': window.location.href},'',window.location.pathname);

				var imgCount = $('img').length,
				imgLoadedCount = 0;

				if(imgCount > 0) {

					$('body').imagesLoaded()
					.always( function( instance ) {

					  	psAjax.doneLoadingPage();

					})
					.progress( function( instance, image ) {
					  if(image.isLoaded) {

					    imgLoadedCount ++;
					    psAjax.onImageLoad(imgLoadedCount,imgCount,image);

					  }
					});
				} else {
					
					psAjax.doneLoadingPage();

				}


			});

		},

		createListeners: function() {

			$('body').on('click',psAjax.ajaxLinkClass,function(e){
				e.preventDefault();
				psAjax.interceptLink($(this));

			});

			$(window).on('popstate', function() {

				//Let's make a fake link... bare with me
				var fakeLink = document.createElement('a');
				$(fakeLink).attr('href',history.state.href);
				$(fakeLink).data('target',history.state.target);

				//Pass our fake link to our link interceptor- see, it made sense
				psAjax.interceptLink($(fakeLink),true);


			});
		},

		onImageLoad : function(loaded,count,image) {

		  	// create and dispatch event
			var event = new CustomEvent("psImageLoaded", {
			  bubbles : true,
			  detail: {
			    imagesLoaded 	: loaded,
			    totalImages 	: count,
			    image 			: image
			  }
			});
			
			window.dispatchEvent(event);

		},


		//This fires after a timeout and after ajax load to check if we're
		//ready to signify the end of the load.
		addToAndCheckIfLoadingComplete : function(target,identifier) {
			psAjax.currentLoadingState++;

			//Loading is complete
			if(psAjax.currentLoadingState == 2) {

				psAjax.currentLoadingState = 0;
				
				// create and dispatch event
				var event = new CustomEvent("psAjaxLoadComplete", {
					bubbles : true,
				  	detail: {
				    	identifier 	: identifier
				  	}
				});

				document.querySelector(target).dispatchEvent(event);

			  	$('body').removeClass(psAjax.bodyAjaxLoading);
				$(target).removeClass(psAjax.ajaxLoading);

			}

		},

		//Function that takes the href from the existing link 
		//That's been clicked and creates an ajax call based
		//on data variables on said link
		interceptLink : function(t,isHistory) {

			psAjax.currentLoadingState = 0;

			//Set up an object of all possible settings for later use
			var linkSettings = {
									href 				: t.attr('href'),
									target 				: t.data('target') ? t.data('target') : '.' + psAjax.siteWrap,
									retrieve 			: t.data('retrieve') ? t.data('retrieve') : '.' + psAjax.siteWrap,
									minDuration 		: t.data('min-duration'),
									suppressHistory 	: t.data('suppress-history'),
									identifier 			: t.data('identifier'),
									action 				: t.data('action')
								};
								
			console.log(linkSettings);

			// create and dispatch event
			var event = new CustomEvent("psBeforeAjax", {
				bubbles : true,
				detail: {
			    	identifier 	: linkSettings.identifier
			  	}
			});

			document.querySelector(linkSettings.target).dispatchEvent(event);

			//update url unless this is turned off
			if(linkSettings.suppressHistory == undefined && isHistory == undefined) {
				history.pushState(linkSettings,'',linkSettings.href);
			}

			//Add a timeout if we wan't to have a minimum duration.
			var duration = linkSettings.minDuration == undefined ? psAjax.defaultAjaxLoadingMin : linkSettings.minDuration;

			psAjax.loadingTimeout = setTimeout(function(){
				psAjax.addToAndCheckIfLoadingComplete(linkSettings.target,linkSettings.identifier);
			},duration);

			if(linkSettings.action == undefined) {


				//Add loading classes to both the body and the target
				$('body').addClass(psAjax.bodyAjaxLoading);
				$(linkSettings.target).addClass(psAjax.ajaxLoading);

				$.ajax({
					url			: linkSettings.href,
					method		: 'post',
					success		: function(data){

						//Gather the correct html from the link
						var retrievedHTML = $(data).filter(linkSettings.retrieve).html();

						//Let's get the title tag from the new page, if we're updating history
						if(linkSettings.suppressHistory == undefined) {
							var newTitleTag = $(data).filter('title').text();
							document.title = newTitleTag;
						}

						//Update our selected target with the new html content
						$(linkSettings.target).html(retrievedHTML);

						//Let's now do a check on new images and keep loading state going until they're all complete
						var imgCount = $('img',linkSettings.target).length,
						imgLoadedCount = 0;

						if(imgCount > 0) {

							$(linkSettings.target).imagesLoaded()
							.always( function( instance ) {
								psAjax.addToAndCheckIfLoadingComplete(linkSettings.target,linkSettings.identifier);
							})
							.progress( function( instance, image ) {
							  if(image.isLoaded) {

							    imgLoadedCount ++;

						  		psAjax.onImageLoad(imgLoadedCount,imgCount,image);

							  }
							});
						} else {
						  	psAjax.addToAndCheckIfLoadingComplete(linkSettings.target,linkSettings.identifier);
						}

					}
				});

			//custom actions that hook up to Wordpress functions
			} else {
				// create and dispatch event
				var event = new CustomEvent("psBeforeCustomAjaxAction", {
					bubbles : true,
					detail: {
				    	identifier 	: linkSettings.identifier
				  	}
				});

				document.querySelector(linkSettings.target).dispatchEvent(event);
				
				$.ajax({
					url			: au,
					method		: 'post',
					dataType	: 'json',
					data 		: {action: linkSettings.action},
					success		: function(data){
						// create and dispatch event
						var event = new CustomEvent("psAfterCustomAjaxAction", {
							bubbles : true,
							detail: {
						    	identifier 	: linkSettings.identifier,
						    	data 		: data
						  	}
						});

						document.querySelector(linkSettings.target).dispatchEvent(event);
					}
				});


			}


		}
	}
	module.exports = psAjax;
}());

