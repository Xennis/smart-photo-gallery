<?php
class SPG_Api_Request {
	
	private $route;
	
	public function __construct($route) {
		$route = explode('?', $route);
		$this->route = $route[0];
	}
	
	public function getRoute($part=null) {
		if (is_numeric($part)) {
			return explode("/", $this->route)[$part];
		} else {
			return $this->route;
		}
	}
	
	public function getMethod() {
		return $_SERVER['REQUEST_METHOD'];
	}
	
	public function getParam($param) {
		return $_GET[$param];
	}
	
	public function getBody() {
		return json_decode(file_get_contents("php://input"), TRUE);
	}
}