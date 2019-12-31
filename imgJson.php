<?php
	header("Content-type:text/html;charset=UTF-8");
	require "../yugyud.html/admin/connet.php";   //导入mysql.php访问数据库 
	$conn=new Mysql();
	// $j=1;
	// for($i=1;$i<101;$i++){				
		
	// 	$j=$j>10?1:$j;
			
	// 	$src="images/".$j.".jpg";
	// 	$title="瀑布流".$i;
	// 	$sql="INSERT INTO imgJson(src,title) VALUES('".$src."','".$title."')";
	// 	$result=$conn->sql($sql);
	// 	$j++;
	// };
	$startIndex=$_GET["startIndex"];
	$sum=$_GET["sum"];	
	// $startNum=20;
	// $sum=40;
	$sql="SELECT * FROM imgJson order by id desc Limit ".$startIndex.",".$sum;
    $result=$conn->sql($sql);
	if($result){
		
	
	class Tuji
	{
	    public $title;	
	    public $src;
	};
		$num_results = $result -> num_rows; //结果行数 
	for($i =0  ;$i < $num_results ;$i++)//循环输出每组元素
	  {
	 	$row = $result -> fetch_assoc();
		$tuji = new Tuji();
		$tuji ->title=$row['title'];
		$tuji ->src=$row['src'];
		$data[] = $tuji;		
	 }	;
	 
	$json_string = json_encode($data);		
	echo  json_encode($data);
	
	}else{
		
		echo "没有可执行的数据";
		
	}
	
	

// 	$json_string =json_encode($data);
// // 	echo  json_encode($data);
	
// // file_put_contents('zhishi.json', $json_string);
// $jsonp="successCallback(".$json_string.")";
// echo $jsonp ;

// file_put_contents('zhishi.js', $jsonp);	
	
