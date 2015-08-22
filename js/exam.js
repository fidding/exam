$(function(){
	
	
	
	/*微信分享签名~
	// noncestr
     var createNonceStr = function() {
          return Math.random().toString(36).substr(2, 15);
     };

      // timestamp
     var createTimeStamp = function () {
          return parseInt(new Date().getTime() / 1000) + '';
     };
	 //签名
	 var stringSig=function(){
		 var str='jsapi_ticket=bxLdikRXVbTPdHSM05e5u_y9ZTfC1QQzokVyGurk-bSeV9dASlJ3Un55_xADzqgUHGajQYq5CRoWiqQ6JBZ2kg&noncestr=0bw04ee14f5hfr&timestamp=1426668332&url=http://www.bcnear.com/exam';
		 return hex_sha1(str);
	 }
	*/
	var test = {
		'w':$(window).width(),
		'h':$(window).height(),
		'rd':[],//6个1-6的随机数
		'count':0,//答题的位置
		'musicbg':document.getElementById('musicbg'),
		'musicerror':document.getElementById('musicerror'),
		'musicgood':document.getElementById('musicgood'),
		'musicclick1':document.getElementById('musicclick1'),
		'musicclick2':document.getElementById('musicclick2'),
		'musicclick3':document.getElementById('musicclick3'),
		'musicclicknum':1,
		//入口
		'init':function(){
			var self = this;
			self.basestyle();
			self.testevent();
			self.music();		
			//self.personanimate();//人物动画
		},
		//基本样式
		'basestyle':function(){
			var self = this;
			//全屏高度
			$('.w').css('height',self.h);
			$('.error').css('height',self.h);
			$('.answer').css('height',self.h);
			$('.good').css('height',self.h);
			//下一题
			$('.nextquestion').css('bottom',50/1080*self.h).css('marginLeft',-122/1080*self.h);

			//p1 question 宽度
			$('.p1 .question').css('width',500/1080*self.h).css('marginLeft',-270/1080*self.h);
			//p1 题目 左侧 留白
			$('.p1 .question .q').css({'marginLeft':160/1080*self.h,'position':'absolute','z-index':'100','top':'8px','cursor':'default'});

			//p2 question 宽度
			$('.p2 .question').css('width',500/1080*self.h).css('marginLeft',-270/1080*self.h);
			//p2 题目 左侧 留白
			$('.p2 .question .q').css({'marginLeft':180/1080*self.h,'position':'absolute','z-index':'100','top':'8px','cursor':'default'});

			//p3 question 宽度
			$('.p3 .question').css('width',500/1080*self.h).css('marginLeft',-270/1080*self.h);
			//p3 题目 左侧 留白
			$('.p3 .question .q').css({'marginLeft':160/1080*self.h,'position':'absolute','z-index':'100','top':'8px','cursor':'default'});

			//p4 question 宽度
			$('.p4 .question').css('width',500/1080*self.h).css('marginLeft',-270/1080*self.h);
			//p4 题目 左侧 留白
			$('.p4 .question .q').css({'marginLeft':160/1080*self.h,'position':'absolute','z-index':'100','top':'8px','cursor':'default'});

			//p5 question 宽度
			$('.p5 .question').css('width',500/1080*self.h).css('marginLeft',-270/1080*self.h);
			//p5 题目 左侧 留白
			$('.p5 .question .q').css({'marginLeft':160/1080*self.h,'position':'absolute','z-index':'100','top':'8px','cursor':'default'});

			//p6 question 宽度
			$('.p6 .question').css('width',500/1080*self.h).css('marginLeft',-270/1080*self.h);
			//p6 题目 左侧 留白
			$('.p6 .question .q').css({'marginLeft':150/1080*self.h,'position':'absolute','z-index':'100','top':'8px','cursor':'default'});
		},
		//模考事件
		'testevent':function(){
			var self = this;
			var pthis_answerAD;
			//开始考试
			$('.index span').on('click',function(){
				self.teststart();
			});
			//题目切换
			$('.question>li').on('click',function(){
				var num = $(this).parent().attr('data-question');
				var p = ".p"+num+" .question>li .select";
				$(p).remove();
				$(this).prepend("<img class='select' src='img/select.png'/>");
				$(this).parent().siblings('.nextquestion').attr('data-select',($(this).index()+1));
				//快速切换同一首音乐解决方案
				if(self.musicclicknum<3){
					self.musicclicknum++;
				}else{
					self.musicclicknum = 1;
				}
				switch(self.musicclicknum){
					case 1:
					self.musicclick1.play();
					break;
					case 2:
					self.musicclick2.play();
					break;
					case 3:
					self.musicclick3.play();
					break;
				}	
			});
			//下一题
			$('.nextquestion').on('click',function(){
				if($(this).attr('data-select') == 0)return;
				var pthis_answer=$(this).attr('data-question');
				pthis_answerAD=pthis_answer;
				var pthis = ".p"+self.rd[self.count];
				var pnext = ".p"+self.rd[self.count+1];
				
				if($(this).attr('data-question') == $(this).attr('data-select')){
	
					if(self.count >= 5){
						$('.test').hide();
						$('.answer').hide();
						$(pthis).hide();	
						$('.good').show();
						
					}else{
						$(pthis).hide();
						$(pnext).show();

						$(pnext).children('.question').children('li').addClass('rollIn');//选项动画
						$(pnext).children('.title').addClass('flip');//标题动画
					}
					self.musicgood.play();//成功 音乐
				}else{
					$('.test').hide();
					$(pthis).hide();
					
					switch(pthis_answer){
						case '1':
							pthis_answerAD='A';
							break;
						case '2':
							pthis_answerAD='B';
							break;
						case '3':
							pthis_answerAD='C';
							break;
						default:
							pthis_answerAD='D';
							break;
					}
					
					$('.error').show();
					self.musicerror.play();//失败 音乐
				}
				self.count++;
			});
			//重新挑战
			$('.error-again').on('click',function(){
				self.teststart();
			});
			//看点别的
			$('.company-web').on('click',function(){
				location.href='http://www.wifibanlv.com/';
			});
			//查看答案
			$('.lookanswer').on('click',function(){	
				$('.answer-title').html('');
				$('.answer-title').append('想不到吧,标准答案居然为：<a style="color:#ff0000">'+pthis_answerAD+'</a><br>探个究竟？来看看村长是怎么解释的');
				$('.error').hide();
				$('.answer').show();
			});
			//村长解释
			$('.good-dictionary').on('click',function(){
				location.href='http://mp.weixin.qq.com/s?__biz=MjM5NzAyNTMwMA==&mid=205896345&idx=1&sn=ffc0df2148e8ff6484a576d1925c47a0#rd ';
			});
		},
		//开始考试
		'teststart':function(){
			var self = this;
			self.createRd();//首先产生8个随机数
			var p = ".p"+self.rd[0];
			self.count = 0;
			$('.test').show();
			$('.test>li , .index , .good , .error').hide();
			$(p).show();

			$(p).children('.question').children('li').addClass('rollIn');//选项动画
			$(p).children('.title').addClass('flip');//标题动画

			$('.question>li .select').remove();
			$('.nextquestion').attr('data-select','0');
		},
		//开始生产随机数 ---题目顺序
		'createRd':function(){
			var self = this;
			self.rd = [];
			while(self.rd.length < 6){
				var num = parseInt(Math.ceil(Math.random()*6));
				var c = false;
				for(var i in self.rd) {
				    if(self.rd[i] == num) {
				    	c = true;
				    	break;
				    }
			   	}
			   	if(c){
			   		continue;
			   	}
			   	self.rd.push(num);
			}
		},
		//音乐事件
		'music':function(){
			var self = this;
			$('.music').on('click',function(){
				if($(this).hasClass('off')){
					$(this).removeClass('off');
					self.musicbg.play();// 音乐
				}else{
					$(this).addClass('off');
					self.musicbg.pause();// 音乐
				}
			});
		},
		
		
	}

	test.init();

	$.extend({
        'apiece':function (w,h,b) {
        	var ww = $(window).width();//窗口宽度
        	var wh = $(window).height();//窗口高度

        	$('.apiece').css('position','absolute');//防止 css没有设置
        	

        	if(b){

        	}else{
        		$('.apiece').each(function(){
        			var self = $(this);
        			var dw = $(this).attr('data-width');//数据 宽度
		        	var dh = $(this).attr('data-height');//数据 高度

		        	var dt = $(this).attr('data-top');//数据 顶部距离
		        	var dr = $(this).attr('data-right');//数据 右侧距离
		        	var db = $(this).attr('data-bottom');//数据 底部距离
		        	var dl = $(this).attr('data-left');//数据 左侧距离

		        	var rtc = $(this).attr('data-rtc');//right to center
		        	var ltc = $(this).attr('data-ltc');//left to center
				
        			if(dh){
        				self.css('height',wh*dh/h);//设置高度

        				//设置宽度
        				if(dw){
        					self.css('width',wh*dw/h);
        				}

        				//设置上下距离
        				if(dt){
        					self.css('top',wh*dt/h);
        				}else if(db){
        					self.css('bottom',wh*db/h);
        				}

        				//设置左右距离
        				if(dl){
        					self.css('left',wh*dl/h);
        				}else if(dr){
        					self.css('right',wh*dr/h);
        				}
					
        				//设置居中距离
        				if(ltc){
        					//self.css({'left':'50%','marginLeft':ltc/h*wh});
        					self.css({'left':'50%','marginLeft':ltc/h*wh*2});
        				}else if(rtc){
        					self.css({'right':'50%','marginRight':rtc/h*wh});
        				}
        			}else{
        				alert('请设置：class="'+$(this).attr('class')+'" 的 data-height 属性');
        			}
        		});
        	}
        }
	});
	//设置 碎片 的位置
	$.apiece(640,1080,false);

})