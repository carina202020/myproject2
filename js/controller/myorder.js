var app = angular.module("myApp", []);

app
.controller("myCtrl",["$scope" , "appListInfo" ,"$http" ,"$window",function( $scope , appListInfo,$http,$window )  {
	$('.bb').html('fffG');
	$('.my_acount_text').text(languagePackage.my_acount_text);
	$('#orderirecord').text(languagePackage.orderirecord);
	$('#subitem').html(languagePackage.subitem);
	$('#iab_lang').html(languagePackage.iab_lang);
	$('#app_lang').html(languagePackage.app_lang);
	$('.morerecord_lang').html(languagePackage.morerecord_lang);
	$scope.select_type_text=languagePackage.iab_lang;
	$('.buyitem_lang').html(languagePackage.buyitem_lang);
	$('.class_lang').html(languagePackage.class_lang);
	$('#ordertime_lang').html(languagePackage.ordertime_lang);
	$('#amount_lang').html(languagePackage.amount_lang);
	$('.lang_sub').html(languagePackage.lang_sub);
	$('.subitem_lang').html(languagePackage.subitem_lang);
	$('.nextpay_lang').html(languagePackage.nextpay_lang);
	$('.content_lang').html(languagePackage.content_lang);

	



	
	$scope.cancelsub_lang=languagePackage.cancelsub_lang;
	$scope.lang_view=languagePackage.lang_view;
	$scope.lang_canceled=languagePackage.lang_canceled;
	$scope.lang_sub=languagePackage.lang_sub;
	$scope.cancel_lang=languagePackage.cancel_lang;
	$scope.lang_useuntil=languagePackage.lang_useuntil;
	$scope.confirmcancel_lang=languagePackage.confirmcancel_lang;
	$scope.checksub_lang=languagePackage.checksub_lang;
	$scope.submitcancelsub_lang=languagePackage.submitcancelsub_lang;
	$scope.status_lang=languagePackage.status_lang;
	$scope.cancel_confirm=languagePackage.cancel_confirm;
	$scope.cancelsub_title_lang=languagePackage.cancelsub_title_lang;


	
	
	


$scope.no_order='hidden';
var tab='my_order';
var type='2';
$scope.valid_active='valid_active';
var subNo;

getlist(tab,type);
	  $scope.change_tab=function(tab,type){
			$scope.my_order_tab='';
			$scope.my_subscribe_tab='';
			tab=tab;
			getlist(tab,type);
	  }

		  $scope.typebox_show = true;
		  $scope.select_type = '';
		  $scope.select_type=function(){
	            $scope.typebox_show = $scope.typebox_show === false ? true: false;
	       };

	      $scope.do_select_type=function(type){
	    	switch (type){
	    	case 1:
	    		$scope.select_type_text=languagePackage.app_lang;
	    		break;
	    	case 2:
	    		$scope.select_type_text=languagePackage.iab_lang;
	    		break;
	    	}
	       	 $scope.typebox_show = true;
	       	 var tab='my_order';
	       	 type=type;
	       	 getlist(tab,type);
	      };
	      
	      $scope.subscribe_select=function(select_type){
	    	var tab='my_subscribe';
	    	  $scope.valid_active='';
	    	  $scope.invalid_active='';
	    	  if(select_type==10){
	    		  $scope.valid_active='valid_active';
	    	  } 
	    	  if(select_type==20){
	    		  $scope.invalid_active='valid_active';
	    	  } 
	    		 	getlist(tab,select_type);  	
	      }
		  $scope.do_cancel_sub=function(){
			  console.log(subNo);
		  	var data={};
		  	data.subNo=subNo;
		  	appListInfo.do_cancel_sub( data )
		  	 .success(function(response){
		  		 $('.confirm_box_back').removeClass('show');
		  		getlist('my_subscribe','10');

	    	 });
		  }
		  $scope.confirm_cancel_sub=function(index){
			  subNo=this.item.subNo;
			  $('.confirm_box_back').addClass('show');
			  $scope.confirm_content=this.item.content;

		  }
		  $scope.link_mywallet=function(e){

			 url=e.currentTarget.getAttribute("");
			  $window.open(url);
		  }

		  $scope.close_confirm_box=function(){
			  $('.confirm_box_back').removeClass('show');
		  }
		  
		  $scope.open_app=function(e,status){
				  if(status!==3){
				  url=e.currentTarget.getAttribute("tag");
				  $window.open(url);
			  }


		  }
		  
		  
	  function getlist(tab,type){
  	  	 if(tab=='my_order'){
  	  		 	$scope.my_order_tab='tab_active';
	    	  	$scope.my_order_view='show';
	    	  	$scope.my_subscribe_view='hidden';
	    	  	orderType=type;
	      	  	var data={};
	      	  	data.orderType=orderType;
	      	  	appListInfo.getOrderList( data )
	      	  	 .success(function(response){
	    				 if(response["data"].length==0){
						 $scope.buy_content='hidden';
						 $scope.no_order='show';
						 $scope.no_order_text=languagePackage.noorder_lang;
	    				 }
	    				 else{
						 $scope.data =response["data"];
						 $scope.no_order='hidden';
						 $scope.buy_content='show'; 
					 }
	      	  	 });
	      	  	
  	  	 }

  	  	 else if(tab=='my_subscribe'){
 		   	  	$scope.my_subscribe_tab='tab_active';
		   	  	$scope.my_order_view='hidden';
		   	  	$scope.my_subscribe_view='show';
		   	  	var subStatus=type;

		  	  	var data={};
		  	  	data.subStatus=subStatus;
		  	  	appListInfo.getSubList( data )
		  	  	 .success(function(response){

		  	  	 $scope.subdata =response["data"];
			    	       if(response["data"].length==0){
		    					 $scope.sub_order='hidden';
		    					 $scope.no_order='show';
		    					 $scope.no_order_text=languagePackage.nosub_lang;
			    	       }
			    	       else {

			    				 $scope.sub_order='show';
			    	    	   	 $scope.data =response["data"];
			    				 $scope.no_order='hidden';
			    				 $scope.buy_content='show';
			    				 switch (type){
			    		    	  	case "10":
				    		    	  	$scope.subStatus='訂閱中'	
				    		    	  	$scope.sub_invalid='show';	
				    		    	  	break;
			    		    	  	case "20":
			    		    	  		$scope.subStatus='已結束'
			    		    	  		$scope.sub_invalid='hidden';	
			    		    	  		break;  
			    		    	  }
			    	       }
			    	 });
  	  	 	}
	  }
 
    
}]);

