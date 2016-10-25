<?php

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// User Define Function
//// ตัวอย่าง function tsdate รับวันที่ datetime แสดงเป็นวันเดือนปี ภาษาไทยแบบย่อ
//// เช่น 2016.01.05 -> 5 มค. 2559
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function tsdate($exdate)
{
	$tdate0 = str_replace("-", "", $exdate);
	$tdate1 = str_replace(":", "", $tdate0);
	$tdate = str_replace(" ", "", $tdate1);
	$tday = strval(intval(substr($tdate, 6, 2)));
	$tmonth0 = intval(substr($tdate, 4, 2));
	$tmonth = "";
		if ($tmonth0 == 1) { $tmonth = "มค.";}
		else if ($tmonth0 == 2){ $tmonth = "กพ.";}
		else if ($tmonth0 == 3){ $tmonth = "มีค.";}
		else if ($tmonth0 == 4){ $tmonth = "เมย.";}
		else if ($tmonth0 == 5){ $tmonth = "พค.";}
		else if ($tmonth0 == 6){ $tmonth = "มิย.";}
		else if ($tmonth0 == 7){ $tmonth = "กค.";}
		else if ($tmonth0 == 8){ $tmonth = "สค.";}
		else if ($tmonth0 == 9){ $tmonth = "กย.";}
		else if ($tmonth0 == 10){ $tmonth = "ตค.";}
		else if ($tmonth0 == 11){ $tmonth = "พย.";}
		else {$tmonth = "ธค.";}
	$tyear = strval(intval(substr($tdate, 0, 4)) +543);
	$thour = substr($tdate, 8, 2);
	$tmin = substr($tdate, 10, 2);
	if (trim($thour) =="") {$time="";}
	else {$time=$thour.":".$tmin;}
	return trim($tday." ".$tmonth." ".$tyear. " ".$time);
}

//// include php สำหรับติดต่อฐานข้อมูล Path, User Name, Password, ชื่อ Database
include 'mbase.php';
/*
//////// ตัวอย่าง mbase.php ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// <?php
//////// $objConnect = mysql_connect("192.168.200.7", "root","1234") or die("Error Connect to Database");
//////// mysql_query("SET NAMES UTF8");
//////// $objDB = mysql_select_db("mbase_data1");
//////// ?> 
*/
//////// เก็บไว้ที่ Directory เดียวกันกับ php อื่นๆ
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//// รับ Parameters

////// String or Date ใน $strSQL ต้องมี ' ' คร่อม parameter
//$a = $_GET['user_id'];

//// Numeric ใน $strSQL ไม่ต้องมี ' ' คร่อม parameter

$b = $_GET['hosp_id'];

//// SQL ติดต่อกับฐานข้อมูล mySQL Field ชื่อ label อยู่ด้านซ้ายของ List และ Field ชื่อ rightText อยู่ด้านขวาของ List
$strSQL="SELECT concat('สัญญา ',c.comment,'เลขที่ ',c.contract_no) AS label,concat('มูลค่า: ',sum(p.purchase_cost),' บาท') AS rightText,
p.*,sum(purchase_cost) AS purchase_costs   
FROM purchase_detail p, contract_detail cd, reagent_detail r, contract c 
where p.hosp_id='".$b."' and p.is_cancel=0 AND p.contract_id=cd.contract_id 
AND cd.reagent_id=r.reagent_id AND cd.contract_id=c.contract_id
group by p.contract_id ORDER BY p.contract_id ";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$objQuery = mysql_query($strSQL) or die ("Error Query [".$strSQL."]");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// ได้ผล Query แล้วนำมาสร้างเป็น Text รูปแบบ JSON Object เพื่อนำไปใช้ต่อโดย Javascript
//// ส่วนต่อจากนี้ ไม่ต้องแก้ไข ใช้ Code ตามนี้ได้เลย ยกเว้นต้องการปรับปรุงค่าใน Field เช่นแสดงวันที่ภาษาไทย จาก Date Field
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$record = mysql_num_rows($objQuery)-1;
$totalField = mysql_num_fields($objQuery)-1;
$return = '{identifier: "unique_id", items:[';
for ($n=0; $n<=$record; $n++)
{
	$items = mysql_fetch_array($objQuery);	
	$idnumber = $n+1;
	$row = 'unique_id:'.$idnumber.',';
	for ($nfield=0; $nfield<=$totalField; $nfield++)
	{
		$field = mysql_field_name($objQuery, $nfield).''.':';
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// ปรับเปลี่ยนเครื่องหมาย " เพื่อไม่มีปัญหาในการแปลงเป็น Object
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		$value = str_replace('"', "'", $items[$nfield]);
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//// กรณีต้องการใช้ function tsdate ปรับวันที่ mySQL ใน Field date เช่น birthdate เป็น วันที่ไทยแบบย่อ
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		////if($field == 'birthdate:')
		////{
		////	$value = tsdate(str_replace('"', '', $value));
		////}
		/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if($nfield<$totalField)
		{
			$row = $row.trim($field.'"'.$value.'"').','; // ลบ space
		}
		else
		{
			$row = $row.trim($field.'"'.$value.'"'); // ลบ space
		}
	}
	$return = $return.'{';
	if($n<$record)
	{
		$return = $return.$row.'},';
	}
	else
	{
		$return = $return.$row.'}';
	}
	$row = "";
	$value = '';
}
echo $return."]}";
mysql_free_result($objQuery);
?> 