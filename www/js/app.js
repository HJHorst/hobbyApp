// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ionic.service.core', 'starter.controllers','starter.services','ionic.rating'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


    // kick off the platform web client
    Ionic.io();

    // this will give you a fresh user or the previously saved 'current user'
    var user = Ionic.User.current();

    // if the user doesn't have an id, you'll need to give it one.
    if (!user.id) {
      user.id = Ionic.User.anonymousId();
      // user.id = 'your-custom-user-id';
    }

    //persist the user
    user.save();
    
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.encyclopedie', {
    url: '/encyclopedie',
    views: {
      'menuContent': {
        templateUrl: 'templates/encyclopedie.html'
      }
    }
  })

  .state('app.radio', {
      url: '/radio',
      views: {
        'menuContent': {
          templateUrl: 'templates/radio.html'
        }
      }
    })
  .state('app.verzoekjes', {
      url: '/verzoekjes',
      views: {
        'menuContent': {
          templateUrl: 'templates/verzoekjes.html'
        }
      }
    })

  .state('app.artikelen', {
      url: '/artikelen',
      views: {
        'menuContent': {
          templateUrl: 'templates/artikelen.html',
          controller: 'ArtikelenCtrl'
        }
      }
    })

  .state('app.artikel', {
    url: '/artikel/:artikelId',
    views: {
      'menuContent': {
        templateUrl: 'templates/artikel.html',
        controller: 'ArtikelCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
