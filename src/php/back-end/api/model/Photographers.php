<?php

class SPG_Api_Model_Photographers extends SPG_Api_Model_Common {
	
	public function __construct() {
		parent::__construct('photographers');
	}
	
	public function getList() {
		return parent::getList(NULL, 'name');
	}
}