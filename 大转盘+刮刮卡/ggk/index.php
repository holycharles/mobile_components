<?php
header("Content-Type:text/html;charset=utf-8"); 
$ac=$_REQUEST['ac'];
if($ac=='acw')
{
	$str_tel=$_REQUEST['tel'];//此$_REQUEST['tel']就是上一页面里的submitData对象元素里的值
	$order_sn=date("Y").date("m").date("d").date("H").date("i").date("s").rand(1,99);
	$prize_arr =array('success'=>true,'msg'=>'您的手机号'.$str_tel.'提交成功','sn'=>$order_sn); //这是提交后填写订单成功的
	//$prize_arr =array('success'=>true,'msg'=>'提交成功','sn'=>$order_sn); //这是提交后填写订单成功的
	echo json_encode($prize_arr);
}

 
?>