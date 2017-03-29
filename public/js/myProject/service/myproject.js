myApp
.factory( "appListInfo" , [ "$http" , function appListInfoFactory( $http ){
	return {
		getSubListAll : function() {
			return  $http.get("/api/emails/all");
		},
		updateSubList: function(data) {
			return $http.post( "/api/emails/many" , data );
		},
	};
}]);

