myApp
.factory( "appListInfo" , [ "$http" , function appListInfoFactory( $http ){
	return {
		getSubList : function() {
			return  $http.get("/api/emails/sub");
		},
		getNotSubList : function(  ) {
			return  $http.get("/api/emails/notsub");
		},
		getSubListAll : function() {
			return  $http.get("/api/emails/all");
		},
		updateSubList: function(data) {
			return $http.post( "/api/emails/many" , data );
		},
	};
}]);

