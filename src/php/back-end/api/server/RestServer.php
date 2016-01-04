<?php

class SPG_Api_RestServer {
	
	// HTTP status codes
	const HTTP_STATUS_200_OK = 200;
	const HTTP_STATUS_201_CREATED = 201;
	const HTTP_STATUS_202_ACCEPTED = 202;
	const HTTP_STATUS_204_NO_CONTENT = 204;	
	const HTTP_STATUS_400_BAD_REQUEST = 400;
	const HTTP_STATUS_403_FORBIDDEN = 403;
	const HTTP_STATUS_404_NOT_FOUND = 404;
	// Response header parameter names
	const HEADER_ACCESS_CONTROL_EXPOSE_HEADERS  = 'Access-Control-Expose-Headers';
	const HEADER_CONTENT_TYPE = 'Content-Type';
	const HEADER_X_TOTAL_COUNT = 'X-Total-Count';
	// Response header parameter values
	const HEADER_CONTENT_TYPE_JSON = 'application/json';	
	
	const API_NAMESPACE = 'smart-gallery/api/';
	
	const ROUTE_GALLERIES = 'galleries';
	const ROUTE_PHOTOS = 'photos';
	const ROUTE_LICENCES = 'licences';
	const ROUTE_PHOTOGRAPHER = 'photographer';

	
	public function serve_request( $route = null ) {
		require_once SPG_DIR_PHP_BACKEND.'/api/model/Common.php';
		$request = new SPG_Api_Request($route);
		$response = new SPG_Api_Response();
		
		// /galleries
		if($this->_startsWith($request->getRoute(), self::ROUTE_GALLERIES)) {
			require_once SPG_DIR_PHP_BACKEND.'/api/model/Galleries.php';
			$model = new SPG_Api_Model_Galleries();
			$id = $request->getRoute(1);

			// /:id
			if (is_numeric($id)) {
				switch ($request->getMethod()) {
					case 'GET':
						$response->setBody($model->getItem($id));
						break;
					case 'PUT':
						$response->setStatus($model->putItem($request->getBody(), $id));
						break;
					case 'DELETE':
						$response->setStatus($model->deleteItem($id));
						break;
				}	
			}
			// /x
			elseif ($id === 'x') {
				switch ($request->getMethod()) {
					case 'GET':
						$response->setBody($model->getItemByCondition($request->getParam('path')));
						break;
				}
			}
			//
			elseif (empty ($id)) {
				switch ($request->getMethod()) {
					case 'GET':
						$response->setBody($model->getList($request->getParam('path')));
						break;
					case 'POST':
						$response->setStatus($model->postItem($request->getBody()));
						break;
				}
			}
		}
		
		// /photos
		else if($this->_startsWith($request->getRoute(), self::ROUTE_PHOTOS)) {
			require_once SPG_DIR_PHP_BACKEND.'/api/model/Photos.php';
			$model = new SPG_Api_Model_Photos();
			$id = $request->getRoute(1);
			
			// /:id
			if (is_numeric($id)) {
				switch ($request->getMethod()) {
//					case 'GET':
//						$response->setBody($model->getItem($id));
//						break;
					case 'PUT':
						$response->setStatus($model->putItem($request->getBody(), $id));
						break;
					case 'DELETE':
						$response->setStatus($model->deleteItem($id));
						break;
				}	
			}
			//
			elseif (empty($id)) {
				switch ($request->getMethod()) {
					case 'GET':
						$body = $model->getList($request->getParam('gallery'), $request->getParam('order'), $request->getParam('limit'), $request->getParam('offset'));
						// may use $wpdb->num_rows instead of count?
						$response->setHeader(self::HEADER_X_TOTAL_COUNT, count($body));
						$response->setBody($body);
						break;
					case 'POST':
						$response->setStatus($model->postItem($request->getParam('path')));
						break;
					case 'PUT':
						$body = $model->putItems($request->getBody());
						if ($body === true) {
							$response->setStatus(self::HTTP_STATUS_202_ACCEPTED);
						} else {
							$response->setStatus(self::HTTP_STATUS_400_BAD_REQUEST);
							$response->setBody($body);
						}
						break;
				}
			}
		}		
		
		// /photographers
		else if($this->_startsWith($request->getRoute(), self::ROUTE_PHOTOGRAPHER)) {
			require_once SPG_DIR_PHP_BACKEND.'/api/model/Photographers.php';
			$model = new SPG_Api_Model_Photographers();
			$id = $request->getRoute(1);

			// /:id
			if (is_numeric($id)) {
				switch ($request->getMethod()) {
					//case 'DELETE':
					//	$response->setStatus($model->deleteItem($id));
					//	break;
				}	
			}
			//
			elseif (empty ($id)) {
				switch ($request->getMethod()) {
					case 'GET':
						$response->setBody($model->getList());
						break;
					case 'POST':
						$response->setStatus($model->postItem($request->getBody()));
						break;
					case 'PUT':
						$response->setBody($model->putItems($request->getBody()));
						break;					
				}
			}
		}		
		
		$response->execute();
	}
	
	private function _startsWith($string, $value) {
		return 0 === strpos($string, $value);
	}
	
	private function _getJsonError() {
		switch (json_last_error()) {
			case JSON_ERROR_NONE:
				echo ' - No errors';
			break;
			case JSON_ERROR_DEPTH:
				echo ' - Maximum stack depth exceeded';
			break;
			case JSON_ERROR_STATE_MISMATCH:
				echo ' - Underflow or the modes mismatch';
			break;
			case JSON_ERROR_CTRL_CHAR:
				echo ' - Unexpected control character found';
			break;
			case JSON_ERROR_SYNTAX:
				echo ' - Syntax error, malformed JSON';
			break;
			case JSON_ERROR_UTF8:
				echo ' - Malformed UTF-8 characters, possibly incorrectly encoded';
			break;
			default:
				echo ' - Unknown error';
			break;
		}
	}
}