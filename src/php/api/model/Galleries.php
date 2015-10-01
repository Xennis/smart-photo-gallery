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
		// Split $file by delimeter and remove the last element
		// e.g. "cars/bmw/1950" =>  ["cars", "bmw"]
		$fileExplore = explode('/', $file);
		array_pop($fileExplore);

		// Create a strings to find all parent galleries and the gallery itself.
		// e.g. $file + ["cars", "bmw"] => "'cars/bmw/1950', 'cars/bmw', 'cars'"
		$galleryFiles = "'{$file}'";
		for($i = 0; $i < count($fileExplore); $i++) {
			$galleryFiles .= ", '";
			for($j = 0; $j < $i; $j++) {
				$galleryFiles .= $fileExplore[$j]."/";
			}
			$galleryFiles .= $fileExplore[$i]."'";
		}
		// Query for the gallery and its parents by using the WHERE IN syntax.
		$result = $this->model->getMultiple("`file` IN ({$galleryFiles})", "file", WPLDK_Database_Model::OUTPUT_TYPE_ARRAY_A);
		// Get the gallery, which is the last element of the array since the
		// quere was ordered ascend by the file column.
		$gallery = array_pop($result);
		// The depth is the number of parent galleries, i.e. the size of the
		// array.
		$gallery['depth'] = sizeof($result);
		// Add the parents, which is the rest of the array since the array_pop
		// operation removes the last item.
		$gallery['parents'] = $result;

		return $gallery;
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