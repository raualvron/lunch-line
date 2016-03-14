angular.module('starter.controllers')

.controller('AccountCtrl', function($scope, $firebaseArray, $state) {
	
	var refUser = new Firebase("https://yoangapp.firebaseio.com");
	var authData = refUser.getAuth();
	var idUser = authData.uid;

	var refIDUser = new Firebase("https://yoangapp.firebaseio.com/users");

	var userName = "";
	var userSurname = "";

	refIDUser.orderByChild("id").equalTo(idUser).on("child_added", function(snapshot) {

		userName = snapshot.child("name").val();
		userSurname = snapshot.child("surname").val();
		city = snapshot.child("city").val();
		create = snapshot.child("created").val();

		console.log(create);

		$scope.formData = {name: userName, surname: userSurname, city: city, create: create};

	});
	
	$scope.logout = function() {

		var ref = new Firebase("https://yoangapp.firebaseio.com");
		ref.unauth();

		$state.go('login');
	};


});
		