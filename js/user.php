<?php
	header("ContentType:text/json");
	//get
	$arr = [
		"uname" => $_GET["uname"],
		"psd" => $_GET["psd"],
		"phone" => $_GET["phone"],
		"email" => $_GET["email"]
	];	
		echo json_encode($arr);
?>