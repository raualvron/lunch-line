angular.module('starter.controllers', ['firebase'])

.controller('LoginCtrl', function($scope, $window, $ionicPopup, $state, $ionicPlatform, MyService) {

    var ref = new Firebase("https://yoangapp.firebaseio.com");

    //Login correct - Go to dashboard
    $scope.signIn = function(formData) {
        ref.authWithPassword({
            email: formData.mail,
            password: formData.pass
        }, function(error, authData) {
            if (error) {
                $scope.loginFailed();
            } else {
                $state.go('tabs.dash')
            }
        });
    };

    //Creating new user
    $scope.createUser = function(formData) {
        ref.createUser({
            email: formData.mail,
            password: formData.pass
        }, function(error, userData) {
            if (error) {
                $scope.createError(error);
            } else {
                var ruteUser = ref.child("/users/");
                $scope.userInfo = {name: formData.name , surname: formData.surname , email: formData.mail, id: userData.uid, city: formData.city};
                ruteUser.push($scope.userInfo);
                $state.go('login')
            }
        });
    };


    //Get error when the user push the email
    $scope.createError = function(error) {
        var alertPopup = $ionicPopup.alert({
            title: 'Create new user failed',
            template: error
        });
    };

    //Reset password - Get the email
    $scope.resetPass = function(formData) {
        ref.resetPassword({
            email: formData.mail
        }, function(error) {
            if (error == null) {
                $state.go('login')
            } else {
                $scope.createError(error);
            }
        });
    };

    //Login failed user and password form 
    $scope.loginFailed = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Login failed',
            template: 'You email or password are not correct. Try again!'
        });
    };
});