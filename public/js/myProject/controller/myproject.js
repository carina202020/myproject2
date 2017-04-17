var myApp = angular.module("myApp", []);

myApp
.controller("myCtrl",["$scope" , "appListInfo" ,"$http" ,"$window","$filter",function( $scope , appListInfo,$filter )  { 	  	

	      	  	init(); //初始 	  	 
	      	  	$scope.selectedSub = function () {selectedSub();}
	      	  	$scope.selectedNotSub = function () {selectedNotSub();}


	function init(){
		$scope.statusText='未設定';

		var subscriptioned=[{
		"name": "鄒珊珊",

			"email": "sandy19891031@gmail.com"
		},
		{
		"name": "王明明",

			"email": "ming@gmail.com"
		}];

		var subscription=[{
		"name": "鄒小珊",

			"email": "sandy19891031@gmail.com"
		},
		{
		"name": "王小明",

			"email": "ming@gmail.com"
		}


		];
		$scope.un_subscriptionList=subscription;
		$scope.subscriptionList=subscriptioned;


		      	 // appListInfo.getSubListAll()
		      	 //  	 .success(function(response){
		      	  	 	
		      	 //  	 	for (var i =0; i < response.length; i++) {
		      	 //  	 		if(response[i].subscribed==0){
		      	  	 			
		      	 //  	 			subscription.push(response[i]);
		      	 //  	 		}
		      	 //  	 		else if(response[i].subscribed==1){
		      	 //  	 			subscriptioned.push(response[i]);
		      	 //  	 		}

		      	 //  	 	}
		      	 //  	 	$scope.un_subscriptionList=subscription;
		      	 //  	 	$scope.subscriptionList=subscriptioned;
		      	  	 	
		      	 //  	 });


	}
	function selectedSub(){

		$scope.selectlist = $filter('filter')($scope.un_subscriptionList, {checked: true});
	}
	function selectedNotSub(){

		$scope.selectSubList = $filter('filter')($scope.subscriptionList, {checked: true});
		
	}
 	$scope.addSubFunc = function() { //加入訂閱
    //刪除未訂閱陣列
		for(var i=0 ; i< $scope.un_subscriptionList.length ; i++){
			for (var j=0; j<$scope.selectlist.length ; j++){
				if($scope.un_subscriptionList[i].memNo==$scope.selectlist[j].memNo){					
						$scope.un_subscriptionList[i].checked=false;
						$scope.un_subscriptionList[i].subscribed=1;
						$scope.un_subscriptionList.splice(i,1);
				}
					
				}
			}
		//加入訂閱陣列	
		for(var i=0 ; i< $scope.selectlist.length ; i++){
			$scope.subscriptionList.push($scope.selectlist[i]);
			}
}		

    $scope.deleteSubFunc = function() { //刪除訂閱
    	console.log($scope.selectSubList);
	     //刪除訂閱陣列
		for(var i=0 ; i< $scope.subscriptionList.length ; i++){
			for (var j=0; j<$scope.selectSubList.length ; j++){
				if($scope.subscriptionList[i].memNo==$scope.selectSubList[j].memNo){
					$scope.subscriptionList[i].checked=false;
					$scope.subscriptionList[i].subscribed=0;
					$scope.subscriptionList.splice(i,1);
					
				}
					
				}
			}
		//加入未訂閱陣列	
		for(var i=0 ; i< $scope.selectSubList.length ; i++){
			$scope.un_subscriptionList.push($scope.selectSubList[i]);
			
			}
}
$scope.saveSubStatus=function(){
	$scope.statusText='更新中...';
	$scope.statusStyle='update';

    var data = $scope.un_subscriptionList.concat($scope.subscriptionList); 
	appListInfo.updateSubList(data)
		      	  	.success(function(response){
		      	  		if(response.Code==200){
		      	  			$scope.statusText=response.Message;
		      	  			$scope.statusStyle='success';	   
		      	  		}
		      	  	 })
		      	  	 .error(function(response){
		      	  	 	if(response.Code==500){
		      	  			$scope.statusText=response.error;
		      	  			$scope.statusStyle='fail';	
		      	  		}
		      	  	 });
 }


}]);


