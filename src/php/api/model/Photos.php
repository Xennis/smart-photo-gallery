<?php
class SPG_Api_Model_Photos extends SPG_Api_Model_Common {
	
	public function __construct() {
		parent::__construct('photos');
	}
	
	public function getList($gallery) {
		if ($gallery) {
			$whereCondition = "`gallery` = {$gallery}";
		}
		return $this->model->getMultiple($whereCondition, 'sequence');
	}
}