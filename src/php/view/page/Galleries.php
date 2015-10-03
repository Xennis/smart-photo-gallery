<?php

class View_Page_Galleries {
	
	public function display() {
		$upload_url = wp_upload_dir();
		$upload_url = $upload_url['baseurl'].DIRECTORY_SEPARATOR.SPG_NAME;
		?>
			<script>
				var spgAppConfig = {
					upload_url: '<?php echo $upload_url; ?>',
					maximum_upload_file_size: '<?php echo floor(wp_max_upload_size() / 1000000); ?>'
				};
			</script>

			<div class="wrap" ng-app="smart-photo-gallery">
				<div ui-view></div>
			</div><!-- .wrap -->
		<?php		
	}
		
}