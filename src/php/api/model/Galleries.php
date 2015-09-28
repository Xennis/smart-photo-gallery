<?php

class SPG_Api_Model_Galleries {
	
	private $model;
	
	public function __construct() {
		$this->model = new WPLDK_Database_Model('galleries');
	}
	
	public function getList($path=null) {
		//$path = str_replace('%2f', '/', $path);
		
		if (!empty($path)) {
			$whereCondition = "`file` LIKE '${path}/%' AND `file` NOT LIKE '${path}/%/%'";
		} else {
			$whereCondition = "`file` NOT LIKE '%/%'";
		}
		return $this->model->getMultiple($whereCondition, 'name');
	}
	
	public function getItem($id) {
		return $this->model->get("`id` = '{$id}'");
	}
	
	public function getItemByCondition($file) {
		return $this->model->get("`file` LIKE '{$file}'");		
	}
	
	public function postItem(array $data) {
		$result = $this->model->insert($data);			
		if ($result === false) {
			return SPG_Api_RestServer::HTTP_STATUS_400_BAD_REQUEST;
		} else {
			return SPG_Api_RestServer::HTTP_STATUS_201_CREATED;
		}
	}
	
	public function putItem(array $data, $id) {
		$result = $this->model->update($data, $id);
		if ($result === false) {
			return SPG_Api_RestServer::HTTP_STATUS_400_BAD_REQUEST;
		} else {
			return SPG_Api_RestServer::HTTP_STATUS_200_OK;
		}		
	}
	
	public function deleteItem($id) {
		$result = $this->model->delete($id);
		if ($result === false) {
			return SPG_Api_RestServer::HTTP_STATUS_400_BAD_REQUEST;
		} else {
			return SPG_Api_RestServer::HTTP_STATUS_202_ACCEPTED;
		}
	}
}