<?php
class SPG_Api_Model_Photos extends SPG_Api_Model_Common {
	
	const THUMB_DIR = 'thumb';
	
	public function __construct() {
		parent::__construct('photos', ['photographer']);
	}
	
	/**
	 * 
	 * @param null|string|int $galleryId ID of a gallery
	 * @return type
	 */
	public function getList($galleryId = NULL) {
		if ($galleryId) {
			$whereCondition = "`gallery` = {$galleryId}";
		}
		return parent::getList($whereCondition, 'sequence');
	}
	
	/**
	 * 
	 * @param string $galleryPath Path of gallery, e.g. car/bmw/1950
	 * @return type
	 */
	public function postItem($galleryPath) {
		$gallery = (new WPLDK_Database_Model('galleries'))->get("`file` LIKE '{$galleryPath}'");
		if (isset($gallery) && !empty($_FILES)) {
			// Upload path
			$upload_dir = wp_upload_dir();
			$upload_dir = $upload_dir['basedir'].DIRECTORY_SEPARATOR.SPG_NAME;
			
			if ($fileName = $this->_moveFile($upload_dir, $galleryPath)) {
				return parent::postItem(array(
					'file' => $fileName,
					'gallery' => $gallery->id,
					'upload' => time()
				));
			}
			return SPG_Api_RestServer::HTTP_STATUS_400_BAD_REQUEST;
		}
		return SPG_Api_RestServer::HTTP_STATUS_204_NO_CONTENT;
	}

	/**
	 * Moves a upload file (given by $_FILES) into the galleries folder and
	 * creates a thumbnail.
	 * 
	 * @param string $upload_dir Upload dir of this plugin, e.g. ...wp-content/uploads/PLUGIN-NAME/
	 * @param string $path Path of the photos gallery, e.g. cars/bmw/1950
	 * @return string|bool File name, FALSE on failure
	 */
	private function _moveFile($upload_dir, $path) {
		$upload_path = $upload_dir.DIRECTORY_SEPARATOR.$path;
		$this->_makeDir($upload_path);
		// Thumbnail path
		$upload_thumb_path = $upload_dir.DIRECTORY_SEPARATOR.self::THUMB_DIR.DIRECTORY_SEPARATOR.$path;
		$this->_makeDir($upload_thumb_path);
			
		$tempFile = $_FILES['file']['tmp_name'];//this is temporary server location
		$fileName = $_FILES['file']['name'];
			
		// Adding timestamp with image's name so that files with same name can be uploaded easily.
		$targetFile = $upload_path.DIRECTORY_SEPARATOR.$fileName;
		
		if (move_uploaded_file($tempFile, $targetFile)) {
			$this->_createThumbnail($targetFile, $upload_thumb_path.DIRECTORY_SEPARATOR.$fileName);
			return $fileName;
		}
		return FALSE;
	}
	
	/**
	 * Creates recursive a directory with a spefic mode.
	 * 
	 * @param string $dir
	 * @return bool True on success
	 */
	private function _makeDir($dir) {
		if (!file_exists($dir)) {
			return mkdir($dir, 0755, true);
		}
		return TRUE;
	}
	
	/**
	 * Creates a thumbnail 
	 * @param type $file File path, e.g. ...wp-content/uploads/PLUGIN-NAME/PATH/example.jpg 
	 * @param type $target Target path, e.g. ...wp-content/uploads/PLUGIN-NAME/thumb/PATH/example.jpg
	 */
	private function _createThumbnail($file, $target) {
		require_once(SPG_DIR.'/vendor/abeautifulsite/simpleimage/src/abeautifulsite/SimpleImage.php');
		$img = new abeautifulsite\SimpleImage($file);
		$img->thumbnail(250, 250)
			->save($target, 70);
	}

}