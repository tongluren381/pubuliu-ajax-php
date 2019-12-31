//一定要用window.onload不能用$(function(){})
// var data = [{'src':'1.jpg','title':'瀑布流效果1'},{'src':'2.jpg','title':'瀑布流效果2'},{'src':'3.jpg','title':'瀑布流效果3'},{'src':'4.jpg','title':'瀑布流效果4'},{'src':'5.jpg','title':'瀑布流效果5'},{'src':'6.jpg','title':'瀑布流效果6'},{'src':'7.jpg','title':'瀑布流效果7'},{'src':'8.jpg','title':'瀑布流效果8'},{'src':'9.jpg','title':'瀑布流效果9'},{'src':'10.jpg','title':'瀑布流效果10'}];
	
window.onload=function(){
	//滚动底部加载
	
	var startIndex=0;
	$(window).scroll(function(){
		//屏幕加滚动距离
		var client=document.documentElement.clientHeight;
		var scroll=document.body.scrollTop||document.documentElement.scrollTop;
		var b=client+scroll;
		//最后一个盒子距顶部距离
		var boxs=$(".box");
		var a=boxs[boxs.length-1].offsetTop+boxs[boxs.length-1].offsetHeight;
		//判断是否加载
		
	
	
		if(b>a){
			
			$.ajax({
				url: 'imgJson.php',
				type: 'get',
				data: "startIndex="+startIndex+"&sum=20",
				dataType: 'json'
			}).then(function(data) {
				console.log(data);
				//把从json获取的数据赋值给数组												
				startIndex+=20;
				console.log(startIndex);
				
			for(var i in data){
				var htmlNew=    "<div class='box'>"
							        +"<div class='info'>"
							            +"<div class='pic'><img  src='"+data[i].src+"'   ></div>"
							            +"<div class='title'>"+data[i].title+"</a></div>"
							        +"</div>"
							    +"</div>"
				$("#wrap").append(htmlNew);		
			
			}
			PBL();
				
								
			}).fail(function() {
				console.log('失败');
				$("footer").attr("class","show");
				// console.log($("footer").className() );
				
			});
			
			
			
		

		}
	});
	PBL();
	function PBL(){
		//获取盒子集合
		var boxs=$(".box");
		//获取屏幕可以放几张图片
		var w=boxs[0].offsetWidth;
		var c=document.documentElement.clientWidth;
		var num=Math.floor(c/w);

		//获取第一排盒子高度
		var bh=[];
		for(var i=0;i<boxs.length;i++){
			if(i<num){
				bh[i]=boxs[i].offsetHeight;
			}else{
				//获取最小高度
				var minH=Math.min.apply(null,bh);				
				//获取最小高度的位置
				var index=getIndex(minH,bh);

				//改变其他盒子位置			
				getPost(boxs[i],minH,boxs[index].offsetLeft);
				
				//更新最小高度
				bh[index]+=boxs[i].offsetHeight;
			}
		}		
	};

	

};
	function getIndex(minH,arr){
		for(var i=0;i<arr.length;i++){
			if(minH==arr[i]){
				return i;
			}
		}
	};
	function getPost(box,top,left){	
		
		// 通过设置class名,判断是否操作过位置,避免了重复操作以及刷新全部图片透明度的动画;
		var className=$(box).attr("class");
		console.log("className="+className);
		if(className=="box F"){
			return;
		}else{			
		$(box).addClass("F");
	
		$(box).css({
			"position":"absolute",
			"top":top,
			"left":left,
			"opacity":0
		});
		
		$(box).finish().animate({
			"opacity":1		
		},2000)			
		}
		
	
		

		// $(box).stop().animate({
		// 	"opacity":1
		
		// },2000)
	};
	
