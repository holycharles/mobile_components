<?php
header("Content-Type:text/html;charset=utf-8"); 
//$aa=var_dump($_REQUEST['data']);
//echo json_encode($_REQUEST['data']); 

$prize_arr =array('error'=>'true','success'=>'false','sn'=>'null'); //这是失败的
echo json_encode($prize_arr);  

?>