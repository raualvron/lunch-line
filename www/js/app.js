// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'firebase', 'ngCordova' , 'ui.bootstrap'])

.run(function($ionicPlatform, $stateParams) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
  if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    cordova.plugins.Keyboard.disableScroll(true);

  }
  if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  $stateProvider.state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'LoginCtrl'
  })

  $stateProvider.state('reset', {
    url: '/reset',
    templateUrl: 'templates/reset.html',
    controller: 'LoginCtrl'
  })


  //$stateProvider.state('courseid', {
    //url: '/tab/courses/:id',
    //templateUrl: 'templates/courses-details.html',
    //controller: 'CourseIDCtrl'
  //})

$stateProvider.state('new', {
  url: '/new',
  templateUrl: 'templates/new.html',
  controller: 'NewCtrl'
})

$stateProvider.state('tabs', {
  url: "/tab",
  abstract: true,
  templateUrl: "templates/tabs.html"
})

.state('tabs.dash', {
  url: "/dash",
  views: {
    'dash': {
      templateUrl: "templates/dash.html",
      controller: 'DashCtrl'
    }
  }
})

.state('tabs.courses', {
  url: "/courses",
  views: {
    'courses': {
      templateUrl: "templates/courses.html",
      controller: 'CoursesCtrl'
    }
  }
})

.state('tabs.couses-details', {
  url: "/courses/:id",
  views: {
    'courses': {
      templateUrl: "templates/courses-details.html",
      controller: 'CoursesIDCtrl'
    }
  }
})


.state('tabs.account', {
  url: "/account",
  views: {
    'account': {
      templateUrl: "templates/account.html",
      controller: 'AccountCtrl'
    }
  }
});


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
