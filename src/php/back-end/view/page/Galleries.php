<?php

class View_Page_Galleries {
	
	public function display() {
		?>
			<script>
				var spgAppConfig = {
					upload_url: '<?php echo spg_get_upload_url(); ?>',
					maximum_upload_file_size: '<?php echo floor(wp_max_upload_size() / 1000000); ?>'
				};
			</script>

			<div class="wrap" ng-app="smart-photo-gallery.back-end">
				<div ui-view></div>
			</div><!-- .wrap -->
		<?php		
	}
		
}
