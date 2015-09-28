<?php
/**
 * Configuration of the database on plugin installation.
 * 
 * @package config
 */
abstract class SPG_Config_Db {
	
	public static function __setup_database_tables() {
		require_once(WPLDK_DIR . '/Database/Model.php');
		
		(new WPLDK_Database_Model('galleries'))->createTable("
			`id` smallint(4) NOT NULL AUTO_INCREMENT,
			`file` varchar(50) NOT NULL,
			`folder` int(10) NOT NULL,
			`name` varchar(100) NOT NULL,
			`description` text NOT NULL,
			`thumb` int(10) NOT NULL,
			PRIMARY KEY (`id`),
			UNIQUE KEY `file` (`file`)	
		");
		
		(new WPLDK_Database_Model('photos'))->createTable("
			`id` int(10) NOT NULL AUTO_INCREMENT,
			`file` varchar(50) NOT NULL,
			`description` text NOT NULL,
			`gallery` smallint(4) NOT NULL,
			`sequence` smallint(3) NOT NULL,
			PRIMARY KEY (`id`)
		");		
	}
}