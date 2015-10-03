<?php

function spg_shortcode($atts, $content) {
    $a = shortcode_atts( array(
        'path' => '',
		'thumb_size' => 250,
		'default_view' => 'normal'
	), $atts);
	
	$upload_url = spg_get_upload_url();
	
	return <<<HTML
<script>
	var spgAppConfig = {
		upload_url: '{$upload_url}',			
		path: '{$a['path']}',
		thumb_size: {$a['thumb_size']},
		default_view: '{$a['default_view']}'
	};
</script>
<div class="wrap" ng-app="smart-photo-gallery.front-end">
	<div ui-view></div>
</div>
HTML;
}
add_shortcode('smart-gallery', 'spg_shortcode');