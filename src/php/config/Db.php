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
			`name` varchar(100) NOT NULL,
			`description` text NOT NULL,
			`thumb` int(10) NOT NULL,
			PRIMARY KEY (`id`),
			UNIQUE KEY `file` (`file`)	
		");
		
		// TODO: set sequence in server?
		(new WPLDK_Database_Model('photos'))->createTable("
			`id` int(10) NOT NULL AUTO_INCREMENT,
			`file` varchar(50) NOT NULL,
			`description` text NOT NULL,
			`gallery` smallint(4) NOT NULL,
			`sequence` smallint(3) NOT NULL DEFAULT '999',
			PRIMARY KEY (`id`)
		");
		
		(new WPLDK_Database_Model('photographers'))->createTable("
			`id` smallint(3) NOT NULL AUTO_INCREMENT,
			`name` varchar(60) NOT NULL,
			PRIMARY KEY (`id`)
		");		
		
		(new WPLDK_Database_Model('licences'))->createTable("
			`id` int(11) NOT NULL AUTO_INCREMENT,
			`name` varchar(60) NOT NULL,
			`link` varchar(100) NOT NULL,
			PRIMARY KEY (`id`)
		");
		
	}
}