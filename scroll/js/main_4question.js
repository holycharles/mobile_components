$(document).ready(function() {

	var viewport_height = $(window).height();
	var viewport_width = $(window).width();
	// var body_height=$('body').height();
	// if(viewport_height>body_height){
	// 	$('body').height(viewport_height);   
	// }


	// $('.acc_title').click(function() {
	// 	$(this).next().slideToggle();
	// });

	$('#jq-slider li').height(viewport_height);



	//popbox
	$('#check_rule').click(function() {
		$('#pop_rules').fadeIn();
		return false;
	});

	$('.pop_close').click(function() {
		$('#pop_rules').hide();
		return false;
	});



	//share pop
	$('#btn_share_timeline').click(function() {
		$('#pop_share').fadeIn();
		return false;
	})


	//visitor numbers
	var options = {  
		useEasing: false,
		  useGrouping: false,
		  separator: '',
		  decimal: '.',
		  prefix: '',
		  suffix: ''
	}
	var demo = new countUp("visitor_number", 0, 2014, 0, 2.3, options);
	demo.start();




	//answering functions
	var t1, t2;
	var questionNum = 5;
	var times = ['2014/09/01 16:27:00', '2014/09/01 16:27:30', '2014/09/01 16:28:00', '2014/09/01 16:28:30', '2014/09/01 16:29:00'];
	var timeStamps = [new Date(times[0]).getTime(), new Date(times[1]).getTime(), new Date(times[2]).getTime(), new Date(times[3]).getTime(), new Date(times[4]).getTime()];



	function timeJudge() {
		nowTime = new Date().getTime();
		// console.log(nowTime);
		if (nowTime < timeStamps[0]) {
			questionNum = 5;
			$('.single_question').eq(4).show();
			timer1(parseInt((timeStamps[0] - nowTime) / 1000) + 1);
		} else if (nowTime >= timeStamps[0] && nowTime < timeStamps[1]) {
			questionNum = 4;
			$('.single_question').eq(4).show().removeClass('preparing').find('.counting_circle').hide();
			timer2(parseInt((timeStamps[1] - nowTime) / 1000) + 1);
		} else if (nowTime >= timeStamps[1] && nowTime < timeStamps[2]) {
			questionNum = 3;
			$('.single_question').eq(4).show().removeClass('preparing').find('.counting_circle').hide();
			$('.single_question').eq(3).slideDown().removeClass('preparing').find('.counting_circle').hide();
			timer3(parseInt((timeStamps[2] - nowTime) / 1000) + 1);
			checkAnswerPassed(4);
		} else if (nowTime >= timeStamps[2] && nowTime < timeStamps[3]) {
			questionNum = 2;
			$('.single_question').eq(4).show().removeClass('preparing').find('.counting_circle').hide();
			$('.single_question').eq(3).show().removeClass('preparing').find('.counting_circle').hide();
			$('.single_question').eq(2).slideDown().removeClass('preparing').find('.counting_circle').hide();
			timer4(parseInt((timeStamps[3] - nowTime) / 1000) + 1);
			checkAnswerPassed(3);
			checkAnswerPassed(4);
		} else if (nowTime >= timeStamps[3] && nowTime < timeStamps[4]) {
			//forth question
			questionNum = 1;
			$('.single_question').eq(4).show().removeClass('preparing').find('.counting_circle').hide();
			$('.single_question').eq(3).show().removeClass('preparing').find('.counting_circle').hide();
			$('.single_question').eq(2).show().removeClass('preparing').find('.counting_circle').hide();
			$('.single_question').eq(1).slideDown().removeClass('preparing').find('.counting_circle').hide();
			timer5(parseInt((timeStamps[4] - nowTime) / 1000) + 1);
			checkAnswerPassed(2);
			checkAnswerPassed(3);
			checkAnswerPassed(4);
		} else {
			//over
			questionNum = 0;
			$('.single_question').eq(4).show().removeClass('preparing').find('.counting_circle').hide();
			$('.single_question').eq(3).show().removeClass('preparing').find('.counting_circle').hide();
			$('.single_question').eq(2).show().removeClass('preparing').find('.counting_circle').hide();
			$('.single_question').eq(1).show().removeClass('preparing').find('.counting_circle').hide();
			$('.single_question').eq(0).slideDown();
			// timer7(parseInt((timeStamps[6] - nowTime) / 1000) + 1);
			checkAnswerPassed(1);
			checkAnswerPassed(2);
			checkAnswerPassed(3);
			checkAnswerPassed(4);
		}
	}

	timeJudge();


	$('.single_question .answer_list span').click(function() {
		if ($(this).parent().parent().hasClass('passed') == false  && $(this).parent().parent().hasClass('preparing') == false )  {
			$(this).parent().find('span').removeClass('on');
			$(this).addClass('on');
			$(this).parent().parent().addClass('answered');
			$('.single_question').eq(questionNum-1).delay(4000).slideDown();
			checkAnswerNow(questionNum);
		}
	});



	function timer1(intDiff) {
		t2 = window.setInterval(countDown2, 1000);
		countDown2();

		function countDown2() {
			var day = 0,
				hour = 0,
				minute = 0,
				second = 0; //时间默认值
			if (intDiff > 0) {
				day = Math.floor(intDiff / (60 * 60 * 24));
				hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
				minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;


			$('.single_question').eq(questionNum-1).find('.counting_circle').show().find('em').show();
			$('.single_question').eq(questionNum-1).find('.c_min').html(minute);
			$('.single_question').eq(questionNum-1).find('.c_sec').html(second);

			if(minute==0 && second<15 && $('.single_question').eq(questionNum).hasClass('answered')==false){
				$('.single_question').eq(questionNum).find('.counting_circle').show().find('strong').show().prev().hide();
				$('.single_question').eq(questionNum).find('.c_min').hide().next().hide();
				$('.single_question').eq(questionNum).find('.c_sec').html(second).css({color:'red'});
			}

			intDiff--;

			if (intDiff < 0) {
				clearInterval(t2);
				timeJudge();
			}
		}
	}


	function timer2(intDiff) {
		t2 = window.setInterval(countDown2, 1000);
		countDown2();

		function countDown2() {
			var day = 0,
				hour = 0,
				minute = 0,
				second = 0; //时间默认值
			if (intDiff > 0) {
				day = Math.floor(intDiff / (60 * 60 * 24));
				hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
				minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;


			$('.single_question').eq(questionNum-1).find('.counting_circle').show().find('em').show();
			$('.single_question').eq(questionNum-1).find('.c_min').html(minute);
			$('.single_question').eq(questionNum-1).find('.c_sec').html(second);

			if(minute==0 && second<15 && $('.single_question').eq(questionNum).hasClass('answered')==false){
				$('.single_question').eq(questionNum).find('.counting_circle').show().find('strong').show().prev().hide();
				$('.single_question').eq(questionNum).find('.c_min').hide().next().hide();
				$('.single_question').eq(questionNum).find('.c_sec').html(second).css({color:'red'});
			}

			intDiff--;

			if (intDiff < 0) {
				clearInterval(t2);
				timeJudge();
			}
		}
	}



	function timer3(intDiff) {
		t2 = window.setInterval(countDown2, 1000);
		countDown2();

		function countDown2() {
			var day = 0,
				hour = 0,
				minute = 0,
				second = 0; //时间默认值
			if (intDiff > 0) {
				day = Math.floor(intDiff / (60 * 60 * 24));
				hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
				minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;


			$('.single_question').eq(questionNum-1).find('.counting_circle').show().find('em').show();
			$('.single_question').eq(questionNum-1).find('.c_min').html(minute);
			$('.single_question').eq(questionNum-1).find('.c_sec').html(second);

			if(minute==0 && second<15 && $('.single_question').eq(questionNum).hasClass('answered')==false){
				$('.single_question').eq(questionNum).find('.counting_circle').show().find('strong').show().prev().hide();
				$('.single_question').eq(questionNum).find('.c_min').hide().next().hide();
				$('.single_question').eq(questionNum).find('.c_sec').html(second).css({color:'red'});
			}

			intDiff--;

			if (intDiff < 0) {
				clearInterval(t2);
				timeJudge();
			}
		}
	}



	function timer4(intDiff) {
		t2 = window.setInterval(countDown2, 1000);
		countDown2();

		function countDown2() {
			var day = 0,
				hour = 0,
				minute = 0,
				second = 0; //时间默认值
			if (intDiff > 0) {
				day = Math.floor(intDiff / (60 * 60 * 24));
				hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
				minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;


			$('.single_question').eq(questionNum-1).find('.counting_circle').show().find('em').show();
			$('.single_question').eq(questionNum-1).find('.c_min').html(minute);
			$('.single_question').eq(questionNum-1).find('.c_sec').html(second);

			if(minute==0 && second<15 && $('.single_question').eq(questionNum).hasClass('answered')==false){
				$('.single_question').eq(questionNum).find('.counting_circle').show().find('strong').show().prev().hide();
				$('.single_question').eq(questionNum).find('.c_min').hide().next().hide();
				$('.single_question').eq(questionNum).find('.c_sec').html(second).css({color:'red'});
			}

			intDiff--;

			if (intDiff < 0) {
				clearInterval(t2);
				timeJudge();
			}
		}
	}



	function timer5(intDiff) {
		t2 = window.setInterval(countDown2, 1000);
		countDown2();

		function countDown2() {
			var day = 0,
				hour = 0,
				minute = 0,
				second = 0; //时间默认值
			if (intDiff > 0) {
				day = Math.floor(intDiff / (60 * 60 * 24));
				hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
				minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;


			$('.single_question').eq(questionNum-1).find('.counting_circle').show().find('em').show();
			$('.single_question').eq(questionNum-1).find('.c_min').html(minute);
			$('.single_question').eq(questionNum-1).find('.c_sec').html(second);

			if(minute==0 && second<15 && $('.single_question').eq(questionNum).hasClass('answered')==false){
				$('.single_question').eq(questionNum).find('.counting_circle').show().find('strong').show().prev().hide();
				$('.single_question').eq(questionNum).find('.c_min').hide().next().hide();
				$('.single_question').eq(questionNum).find('.c_sec').html(second).css({color:'red'});
			}

			intDiff--;

			if (intDiff < 0) {
				clearInterval(t2);
				timeJudge();
			}
		}
	}

	function timer6(intDiff) {
		t2 = window.setInterval(countDown2, 1000);
		countDown2();

		function countDown2() {
			var day = 0,
				hour = 0,
				minute = 0,
				second = 0; //时间默认值
			if (intDiff > 0) {
				day = Math.floor(intDiff / (60 * 60 * 24));
				hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
				minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;


			$('.single_question').eq(questionNum-1).find('.counting_circle').show().find('em').show();
			$('.single_question').eq(questionNum-1).find('.c_min').html(minute);
			$('.single_question').eq(questionNum-1).find('.c_sec').html(second);

			if(minute==0 && second<15 && $('.single_question').eq(questionNum).hasClass('answered')==false){
				$('.single_question').eq(questionNum).find('.counting_circle').show().find('strong').show().prev().hide();
				$('.single_question').eq(questionNum).find('.c_min').hide().next().hide();
				$('.single_question').eq(questionNum).find('.c_sec').html(second).css({color:'red'});
			}

			intDiff--;

			if (intDiff < 0) {
				clearInterval(t2);
				timeJudge();
			}
		}
	}


	function timer7(intDiff) {
		t2 = window.setInterval(countDown2, 1000);
		countDown2();

		function countDown2() {
			var day = 0,
				hour = 0,
				minute = 0,
				second = 0; //时间默认值
			if (intDiff > 0) {
				day = Math.floor(intDiff / (60 * 60 * 24));
				hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
				minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
				second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
			}
			if (minute <= 9) minute = '0' + minute;
			if (second <= 9) second = '0' + second;


			$('.single_question').eq(questionNum-1).find('.counting_circle').show().find('em').show();
			$('.single_question').eq(questionNum-1).find('.c_min').html(minute);
			$('.single_question').eq(questionNum-1).find('.c_sec').html(second);

			if(minute==0 && second<15 && $('.single_question').eq(questionNum).hasClass('answered')==false){
				$('.single_question').eq(questionNum).find('.counting_circle').show().find('strong').show().prev().hide();
				$('.single_question').eq(questionNum).find('.c_min').hide().next().hide();
				$('.single_question').eq(questionNum).find('.c_sec').html(second).css({color:'red'});
			}

			intDiff--;

			if (intDiff < 0) {
				clearInterval(t2);
				timeJudge();
			}
		}
	}


	function checkAnswerNow(questionNum) {
		if ($('.single_question').eq(questionNum).find('.answer_list span').hasClass('on') == false) {
			$('.single_question').eq(questionNum).find('.counting_circle').hide();
			$('.single_question').eq(questionNum).find('.feedback_na').show();

		} else if ($('.single_question').eq(questionNum).find('.answer_list span.on').attr('title') == 'yes') {
			$('.single_question').eq(questionNum).find('.counting_circle').hide();
			$('.single_question').eq(questionNum).find('.feedback_right').show();
			$('.single_question').eq(questionNum).find('.answer_list span.on').addClass('correct');

			var currentRightNum = parseInt($('#answer-info em').html());
			$('#answer-info em').html(currentRightNum + 1);

		} else if ($('.single_question').eq(questionNum).find('.answer_list span.on').attr('title') != 'yes') {
			$('.single_question').eq(questionNum).find('.counting_circle').hide();
			$('.single_question').eq(questionNum).find('.feedback_wrong').show();
			$('.single_question').eq(questionNum).find('.answer_list span.on').addClass('wrong');
		}
		$('.single_question').eq(questionNum).addClass('passed');
	}


	function checkAnswerPassed(questionNum) {
		if ($('.single_question').eq(questionNum).hasClass('answered') == false) {
			$('.single_question').eq(questionNum).find('.counting_circle').hide();
			$('.single_question').eq(questionNum).find('.feedback_na').show();
		}
		$('.single_question').eq(questionNum).addClass('passed');
	}









});


$(window).load(function() {
	// $('#jq-slider').flexslider({
	// 	animation: "slide",
	// 	//easing: "easeInOutExpo",
	// 	animationSpeed: 800,
	// 	//slideshowSpeed: 4000,
	// 	directionNav: false,
	// 	controlNav: true,
	// 	animationLoop: false,
	// 	slideshow: false
	// });


	// $('#jp-slider').flexslider({
	// 	animation: "slide",
	// 	//easing: "easeInOutExpo",
	// 	animationSpeed: 400,
	// 	//slideshowSpeed: 4000,
	// 	directionNav: true,
	// 	controlNav: false,
	// 	animationLoop: false,
	// 	slideshow: false,
	// 	itemWidth: 180, 
	// 	minItems: 3,
	// 	maxItems: 3
	// });



});