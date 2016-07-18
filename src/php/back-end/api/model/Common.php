<?php

abstract class SPG_Api_Model_Common {
	
	protected $model;
	
	public function __construct($model, array $foreignKeys = []) {
		$this->model = new WPLDK_Database_Model($model, $foreignKeys);
	}
	
	public function getList($whereCondition = NULL, $order = NULL, $limit = NULL, $offset = NUll) {
		return $this->model->getMultiple($whereCondition, $order, $limit, $offset);
	}
	
	public function getItem($id) {
		return $this->model->get("`id` = '{$id}'");
	}
	
	public function getTotalCount($whereCondition = NULL) {
		return $this->model->count($whereCondition);
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