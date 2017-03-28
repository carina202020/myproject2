app
.factory( "appListInfo" , [ "$http" , function appListInfoFactory( $http ){
	return {
		getOrderList : function( data ) {
			return $http.post( "./api/auth/user/pay/po/list" , data );
		},
		getSubList : function( data ) {
			return $http.post( "./api/auth/user/pay/sub/list" , data );
		},
		do_cancel_sub: function( data ) {
			return $http.post( "./api/auth/user/pay/sub/cancel" , data );
		},
	};
}]);

