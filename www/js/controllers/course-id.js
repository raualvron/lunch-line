angular.module('starter.controllers')

.controller('CoursesIDCtrl', function($scope, $firebaseArray, $stateParams, MyService) {

	$scope.rate = 5;
	$scope.max = 5

	var ref = new Firebase("https://yoangapp.firebaseio.com/timeline/");
	var parentID = "";

	ref.orderByChild("id").equalTo($stateParams.id).on("child_added", function(snapshot) {
		var arraySinc = [];
		arraySinc.push(snapshot.val());
		$scope.items = arraySinc;
		parentID = snapshot.key();
	});

	var refUser = new Firebase("https://yoangapp.firebaseio.com");
	var authData = refUser.getAuth();
	var idUser = authData.uid;

	var refIDUser = new Firebase("https://yoangapp.firebaseio.com/users");

	var userName = "";
	var userSurname = "";

	refIDUser.orderByChild("id").equalTo(idUser).on("child_added", function(snapshot) {

		userName = snapshot.child("name").val();
		userSurname = snapshot.child("surname").val();

	});

	$scope.getParent = function() {
		var refIDParent = new Firebase("https://yoangapp.firebaseio.com/timeline/" + parentID + "/comment");
		var returnVal = true;
		refIDParent.once("value", function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				childSnapshot.forEach(function(childSnapshot2) {
					if (childSnapshot2.val() == "Inma Martin") {
						returnVal = false;
					}
				});		
			});
		});
		return returnVal;
	};

	$scope.createComment = function(formData) {

		
		formData["idU"] = idUser;
		formData["name"] = userName + " " + userSurname;

		ref.orderByChild("id").equalTo($stateParams.id).on("child_added", function(snapshot) {
			var refComment = new Firebase("https://yoangapp.firebaseio.com/timeline/" + snapshot.key() + "/comment/");
			refComment.push(formData);
		});

		formData.star = "";
		formData.comment = "";

	};


	$scope.calculateAverage = function($index){ 

		var sum  = 0;
		var total = 0;

		var refComment = "";

		ref.orderByChild("id").equalTo($stateParams.id).on("child_added", function(snapshot) {
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
