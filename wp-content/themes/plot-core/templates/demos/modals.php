<section class="demo sectionWithVerticalSpacing">

	<div class="maxWidth">

		<h2>Modal Examples</h2>

		<!-- Some example modal buttons here! Do with them as you please -->

		<a class="JS--plotModalButton" href="#" data-plot-modal="modalId1">Example Modal</a>

		<div class="JS--plotModalContents plotModalContents" data-plot-modal="modalId1">
			<h2>Some contents for the modal</h2>
		</div>

		<br>

		<!-- 
			If you want to have an element open a modal on click, add on data-plot-modal
			OPTIONS
			data-plot-modal-type (ajax|inline) Defaults to inline. Do you want modal contents to load via ajax or from the DOM.
			data-plot-modal-contents (string) Required if modal-type = inline. Unique ID to find HTML on the page to populate our modal with
			data-plot-modal-group (string) Optional unique reference to group various modal buttons together, adding group navigation controls
			data-plot-modal-template-part (string) Required if modal-type = ajax. Which template part within our templates folder do we want to load in the modal?
			data-plot-modal-data-* Any data passed with this prefix is sent over to the template part. For example, data-plot-modal-data-artist-id will translate into the template part as $plotData['artistId']
			data-plot-modal-data-foo="bar"  
		-->



		<!-- These two are connected via a gallery ID, so will add on gallery controls and allow users to scroll from one to another -->

		<a class="JS--plotModalButton" href="#"
			data-plot-modal
			data-plot-modal-contents="modalId2" 
			data-plot-modal-group="myGalleryId"
		>Example Modal With Gallery Controls</a>

		<div class="JS--plotModalContents plotModalContents" data-plot-modal-contents="modalId2">
			<h2>Some contents for the gallery modal</h2>
		</div>

		<br>

		<a class="JS--plotModalButton" href="#"
			data-plot-modal
			data-plot-modal-contents="modalId3" 
			data-plot-modal-group="myGalleryId"
		>Another Modal With Gallery Controls</a>

		<div class="JS--plotModalContents plotModalContents" data-plot-modal-contents="modalId3">
			<h2>Other contents for the gallery modal</h2>
		</div>



		<br>

		<!-- This is an example of a modal that loads the content via ajax, and adds on a custom class customModalClass -->

		<a href="#" class="JS--plotModalButton" 
				data-plot-modal
				data-plot-modal-class="customModalClass"
				data-plot-modal-group="myGroupName"
				data-plot-modal-type="ajax" 
				data-plot-modal-template-part="parts/artist-biog"
				data-plot-modal-data-artist-id="574">
				Andy Outback
		</a>


		<br>

		<!-- This is another ajax modal example- grouped with the one above, so you can see group controls on the modal for ajax content too -->
		<a href="#" class="JS--plotModalButton" 
				data-plot-modal
				data-plot-modal-class="customModalClass"
				data-plot-modal-group="myGroupName"
				data-plot-modal-type="ajax" 
				data-plot-modal-template-part="parts/artist-biog"
				data-plot-modal-data-artist-id="577">
				Awkward Lodger
		</a>

	</div>

</section>