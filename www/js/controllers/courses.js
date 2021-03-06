angular.module('starter.controllers')

.controller('CoursesCtrl', function($scope, $firebaseArray, MyService) {

	$scope.rate = 7;
  	$scope.max = 5;

	var refUser = new Firebase("https://yoangapp.firebaseio.com");
	var authData = refUser.getAuth();
	var idUser = authData.uid;
	
	$scope.items = [];
	var ref = new Firebase("https://yoangapp.firebaseio.com/timeline");
	ref.orderByChild("idU").equalTo(idUser).on("child_added", function(snapshot, $q) {
		 	$scope.items.push(snapshot.val());
	});

	$scope.calculateAverage = function($id){ 

		var sum  = 0;
		var total = 0;

		var refComment = "";

		ref.orderByChild("id").equalTo($id).on("child_added", function(snapshot) {
			refComment = new Firebase("https://yoangapp.firebaseio.com/timeline/" + snapshot.key() + "/comment/");
		});


		refComment.once("value", function(ObjComment) {
			total = ObjComment.numChildren();
		});

		refComment.once("value", function(snapshot) {
			snapshot.forEach(function(snapshot) {
				snapshot.forEach(function(childSnapshot) {
					var key = childSnapshot.key();
					if (key == 'star') {
						sum = sum + childSnapshot.val();

					}
				});
			});
		});
		var wround = sum/total;
		var round = Math.round(wround);
		return round;

	};

});
