<?php
header("Content-Type:text/html;charset=utf-8"); 
/**
$prize_arr =array('error'=>'true','success'=>'false','sn'=>'null'); //这是失败的
echo json_encode($prize_arr);  
**/
$ac=$_REQUEST['ac'];
if($ac=='activityuser_sn')
{
	$prize_arr =array('success'=>'true'); //这是提交后填写订单成功的
	echo json_encode($prize_arr);
}

else
{
	$order_sn=date("Y").date("m").date("d").date("H").date("i").date("s").rand(1,99);
	/**
	我们根据抽奖圆盘上的奖项设置对应角度和中奖几率,我们在index.php中构建一个多维数组$prize_arr,
	数组$prize_arr，id用来标识不同的奖项，degree表示转动的度数,min表示圆盘中各奖项区间对应的最小角度，max表示最大角度，如一等奖对应的最小角度：0，最大角度30，这里我们设置max值为1、max值为29，是为了避免抽奖后指针指向两个相邻奖项的中线。由于圆盘中设置了多个七等奖，所以我们在数组中设置每个七等奖对应的角度范围。prize表示奖项内容，v表示中奖几率，我们会发现，数组中12个奖项的v的总和为100，如果v的值为1，则代表中奖几率为1%，依此类推。
	在这里我没有用max和min的转动范围，直接指向的是degree度数
	**/
	/**
		var prizeDeg = [6,36, 66, 96, 126,156, 186, 216,246, 276, 306, 336];//这是我修改后的,其实不起作用了
		将6改为1
		将36改为32
		将66改为62
		将96改为92
		将126改为122
		将156改为150
		将186改为178
		将216改为208
		将246改为238
		276改为266
		将306改为298
		将336改为330
	**/
	
	$prize_arr = array( 
		'0' => array('id'=>1,'degree'=>1,'min'=>1,'max'=>5,'prize'=>'一等奖','v'=>1), 
		'1' => array('id'=>2,'degree'=>32,'min'=>7,'max'=>35,'prize'=>'不要灰心','v'=>10), 
		'2' => array('id'=>3,'degree'=>62,'min'=>37,'max'=>65,'prize'=>'不要灰心和祝您好运的空白','v'=>10), 
		'3' => array('id'=>4,'degree'=>92,'min'=>67,'max'=>95,'prize'=>'祝您好运','v'=>10), 
		'4' => array('id'=>5,'degree'=>122,'min'=>97,'max'=>125,'prize'=>'二等奖','v'=>3), 
		'5' => array('id'=>6,'degree'=>150,'min'=>127,'max'=>155,'prize'=>'再接再励','v'=>10), 
		'6' => array('id'=>7,'degree'=>178,'min'=>157,'max'=>185,'prize'=>'再接再励和运气先藏着中间的空白','v'=>10), 
		'7' => array('id'=>8,'degree'=>208,'min'=>187,'max'=>215,'prize'=>'运气先藏着','v'=>10), 
		'8' => array('id'=>9,'degree'=>238,'min'=>217,'max'=>245,'prize'=>'三等奖','v'=>6), 
		'9' => array('id'=>10,'degree'=>266,'min'=>247,'max'=>275,'prize'=>'要加油哦','v'=>10), 
		'10' => array('id'=>11,'degree'=>298,'min'=>277,'max'=>305,'prize'=>'要加油哦和谢谢参与间的空白','v'=>10), 
		'11' => array('id'=>12,'degree'=>330,'min'=>307,'max'=>335,'prize'=>'谢谢参与','v'=>10) 
	
	); 
	/**
	关于中奖概率算法
	**/
	function getRand($proArr) { 
		$result = ''; 
	 
		//概率数组的总概率精度 
		$proSum = array_sum($proArr); 
	 
		//概率数组循环 
		foreach ($proArr as $key => $proCur) { 
			$randNum = mt_rand(1, $proSum); 
			if ($randNum <= $proCur) { 
				$result = $key; 
				break; 
			} else { 
				$proSum -= $proCur; 
			} 
		} 
		unset ($proArr); 
	 
		return $result; 
	} 
	/**
	函数getRand()会根据数组中设置的几率计算出符合条件的id，我们可以接着调用getRand()。
	代码中，我们调用getRand()，获得通过概率运算后得到的奖项，然后根据奖项中配置的角度范围，在最小角度和最大角度间生成一个角度值，并构建数组，包含角度angle和奖项prize，最终以json格式输出。
	**/
	foreach ($prize_arr as $key => $val) { 
		$arr[$val['id']] = $val['v']; 
	} 
	 $rid = getRand($arr); //根据概率获取奖项id 
	 
	
	 
	$res = $prize_arr[$rid-1]; //中奖项 
	$degree=$res['degree']; 
	$min = $res['min']; 
	$max = $res['max']; 
	/**
	if($res['id']==7){ //七等奖 
		$i = mt_rand(0,5); 
		$result['angle'] = mt_rand($min[$i],$max[$i]); 
	}else{ 
		$result['angle'] = mt_rand($min,$max); //随机生成一个角度 
	} 
	$result['prize'] = $res['prize']; 
	 
	 **/
	
	if($res['id']==1){
		$result_arr =array('error'=>'','success'=>'true','prizetype'=>1,'sn'=>$order_sn,'msg'=>$res['prize']); //这是成功的
	}
	elseif($res['id']==2){
		$result_arr =array('error'=>'true','success'=>'false','sn'=>'null','msg'=>$res['prize']); //这是失败的
	}
	elseif($res['id']==3){
		$result_arr =array('error'=>'true','success'=>'false','sn'=>'null','msg'=>$res['prize']); //这是失败的
	}
	elseif($res['id']==4){
		$result_arr =array('error'=>'true','success'=>'false','sn'=>'null','msg'=>$res['prize']); //这是失败的
	}
	elseif($res['id']==5){
		$result_arr =array('error'=>'','success'=>'true','prizetype'=>5,'sn'=>$order_sn,'msg'=>$res['prize']); //这是成功的
	}
	elseif($res['id']==6){
		$result_arr =array('error'=>'true','success'=>'false','sn'=>'null','msg'=>$res['prize']); //这是失败的
	}
	elseif($res['id']==7){
		$result_arr =array('error'=>'true','success'=>'false','sn'=>'null','msg'=>$res['prize']); //这是失败的
	}
	elseif($res['id']==8){
		$result_arr =array('error'=>'true','success'=>'false','sn'=>'null','msg'=>$res['prize']); //这是失败的
	}
	elseif($res['id']==9){
		$result_arr =array('error'=>'','success'=>'true','prizetype'=>9,'sn'=>$order_sn,'msg'=>$res['prize']); //这是成功的
	}
	elseif($res['id']==10){
		$result_arr =array('error'=>'true','success'=>'false','sn'=>'null','msg'=>$res['prize']); //这是失败的
	}
	elseif($res['id']==11){
		$result =array('error'=>'true','success'=>'false','sn'=>'null','msg'=>$res['prize']); //这是失败的
	}
	elseif($res['id']==12){
		$result_arr =array('error'=>'true','success'=>'false','sn'=>'null','msg'=>$res['prize']); //这是失败的
	}
	$result_arr['angle'] = mt_rand($min,$max); //随机生成一个角度 ,这是以前的
	$result_arr['angle']=$degree; //直接生成一个数组里固定的角度
	echo json_encode($result_arr); 
}
?>