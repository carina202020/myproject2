var myApp = angular.module("myApp", []);

myApp
.controller("myCtrl",["$scope" , "appListInfo" ,"$http" ,"$window","$filter",function( $scope , appListInfo,$http,$window,$filter )  {
     	  	

	      	  	getready(); //初始 	  	 
	      	  	$scope.selectedSub = function () {selectedSub();}
	      	  	$scope.selectedNotSub = function () {selectedNotSub();}
	      	  	$scope.statusText='未設定';


	function getready(){
				appListInfo.getSubList()
		      	  	.success(function(response){
		      	  	 	$scope.subscriptionList=response;
		      	  	 });
		      	 appListInfo.getNotSubList()
		      	  	 .success(function(response){
		      	  	 	$scope.not_subscriptionList=response;
		      	  	 });


	}
	function selectedSub(){
		$scope.selectlist = $filter('filter')($scope.not_subscriptionList, {checked: true});
	}
	function selectedNotSub(){
		$scope.selectSubList = $filter('filter')($scope.subscriptionList, {checked: true});
		
	}
 	$scope.addSubFunc = function() { //加入訂閱
    //刪除未訂閱陣列
		for(var i=0 ; i< $scope.not_subscriptionList.length ; i++){
			for (var j=0; j<$scope.selectlist.length ; j++){
				if($scope.not_subscriptionList[i].memNo==$scope.selectlist[j].memNo){					
						$scope.not_subscriptionList[i].checked=false;
						$scope.not_subscriptionList[i].subscribed=1;
						$scope.not_subscriptionList.splice(i,1);
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
			$scope.not_subscriptionList.push($scope.selectSubList[i]);
			
			}
}
$scope.saveSubStatus=function(){
	$scope.statusText='更新中...';
	$scope.statusStyle='update';

    var data = $scope.not_subscriptionList.concat($scope.subscriptionList); 
	appListInfo.updateSubList(data)
		      	  	.success(function(response){
		      	  		if(response.Code==200){
		      	  			$scope.statusText='系統更新完畢';
		      	  			$scope.statusStyle='success';	   
		      	  		}
		      	  	 })
		      	  	 .error(function(response){
		      	  	 	if(response.Code==500){
		      	  			$scope.statusText='系統更新失敗';
		      	  			$scope.statusStyle='fail';	
		      	  		}
		      	  	 });
 }


}]);


