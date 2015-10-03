<?php

abstract class SPG_Api_Model_Common {
	
	protected $model;
	
	public function __construct($model) {
		$this->model = new WPLDK_Database_Model($model);
	}
	
	public function getList($whereCondition = NULL, $orderBy = NULL) {
		return $this->model->getMultiple($whereCondition, $orderBy);
	}
	
	public function getItem($id) {
		return $this->model->get("`id` = '{$id}'");
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
	
	public function putItems($data) {
		return $this->model->updateMultiple($data);
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