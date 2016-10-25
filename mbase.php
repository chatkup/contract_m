<?php
header("Access-Control-Allow-Origin: *");
$objConnect = mysql_connect("localhost", "root","1234") or die("Error Connect to Database");
mysql_query("SET NAMES UTF8");
$objDB = mysql_select_db("purchase_lab");
?> 