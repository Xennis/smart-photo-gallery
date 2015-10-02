<?php
class SPG_Api_Model_Photos extends SPG_Api_Model_Common {
	
	const THUMB_DIR = 'thumb';
	
	public function __construct() {
		parent::__construct('photos');
	}
	
	public function getList($gallery) {
		if ($gallery) {
			$whereCondition = "`gallery` = {$gallery}";
		}
		return $this->model->getMultiple($whereCondition, 'sequence');
	}
	
	public function postItem($path) {
		$upload_dir = wp_upload_dir();
		$upload_dir = $upload_dir['basedir'].DIRECTORY_SEPARATOR.SPG_NAME;

		if (!empty($_FILES)) {
			// Upload path
			$upload_path = $upload_dir.DIRECTORY_SEPARATOR.$path;
			$this->makeDir($upload_path);
			// Thumbnail path
			$upload_thumb_path = $upload_dir.DIRECTORY_SEPARATOR.self::THUMB_DIR.DIRECTORY_SEPARATOR.$path;
			$this->makeDir($upload_thumb_path);
			
			$tempFile = $_FILES['file']['tmp_name'];//this is temporary server location
			$fileName = $_FILES['file']['name'];
			
			// Adding timestamp with image's name so that files with same name can be uploaded easily.
			$targetFile = $upload_path.DIRECTORY_SEPARATOR.$fileName;
			
			if (move_uploaded_file($tempFile, $targetFile)) {
				$this->createThumbnail($targetFile, $upload_thumb_path.DIRECTORY_SEPARATOR.$fileName);
				return parent::postItem(array(
					'file' => $fileName,
					'gallery' => 8
				));
			}
			return SPG_Api_RestServer::HTTP_STATUS_400_BAD_REQUEST;
		}
		
		return SPG_Api_RestServer::HTTP_STATUS_204_NO_CONTENT;
	}
	
	private function makeDir($dir) {
		if (!file_exists($dir)) {
			mkdir($dir, 0755, true);
		}
	}

	private function createThumbnail($file, $target) {
		require_once(SPG_DIR.'/vendor/abeautifulsite/simpleimage/src/abeautifulsite/SimpleImage.php');
		$img = new abeautifulsite\SimpleImage($file);
		$img->thumbnail(250, 250)
			->save($target, 70);
	}
	
	public function putItems($data) {
		return $this->model->updateMultiple($data);
	}
}