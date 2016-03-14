angular.module('starter.controllers')

.controller('NewCtrl', function($scope, $firebaseArray, $cordovaCamera, $ionicPopup,  $state, MyService) {

	var refUser = new Firebase("https://yoangapp.firebaseio.com");
	var authData = refUser.getAuth();
	var idUser = authData.uid;

	var userName = "";
	var userSurname = "";

	var ref = new Firebase("https://yoangapp.firebaseio.com/users");

	ref.orderByChild("id").equalTo(idUser).on("child_added", function(snapshot) {
		userName = snapshot.child("name").val();
		userSurname = snapshot.child("surname").val();
	});

	$scope.randomID = function () {

		var text = "";
		var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

		for( var i=0; i < 9; i++ )
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;

	}

	$scope.getPhoto = function() {

        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
          	encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
           	targetWidth: 500,
           	targetHeight: 500,
           	saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.images = {image : "data:image/jpeg;base64," + imageData};
             if ($scope.images != null) {
             	$scope.createImg();
             } else {
              $scope.errorImg();
             }
       });
    };


    $scope.createImg = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Creating image..',
            template: 'You image have been uploaded satisfactory'
        });
    };

    $scope.errorImg = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Ups!..',
            template: 'You should load you course'
        });
    };


    $scope.createCourse = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Course created',
            template: 'You course have been created satisfactory'
        });
    };


	$scope.addCourse = function (formData) {
		
		var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
		"July", "Aug", "Sept", "Oct", "Nov", "Dec"
		];

		var objDate = new Date();
		var date = monthNames[objDate.getMonth()] + " " + objDate.getUTCDate() + "," + objDate.getFullYear();

		if ($scope.images == undefined) {
			
			$scope.errorImg();

		} else {

			$scope.array = {created: date , description: formData.description ,  id: $scope.randomID() , idU: idUser, image: $scope.images.image , name: userName, surname: userSurname, star : 8, title: formData.title};

			var myFirebaseRef = new Firebase("https://yoangapp.firebaseio.com/timeline/");

			myFirebaseRef.push($scope.array);

            $scope.images = "";

            formData.title = "";

            formData.description = "";

            $scope.createCourse();

	 		$state.go('tabs.dash');

	 		
	 	}

	};

});
