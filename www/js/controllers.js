angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ArtikelenCtrl', ['$scope','artikelService', function($scope, artikelService) {

  artikelService.getArtikelen().query(
      function(response) {
        // console.log("Ja! response!");
        $scope.artikelen = response;
      },
      function(response) {
        console.log("Error: "+response.statusText);
      }
    );
}])

.controller('ArtikelCtrl', ['$scope','$stateParams','$ionicPopover','artikelService','baseURL','ratingConfig','$ionicPopup',
   function($scope, $stateParams, $ionicPopover, artikelService, baseURL, ratingConfig, $ionicPopup) {

  $scope.baseURL = baseURL;
  $scope.artikelId = parseInt($stateParams.artikelId,10);

  //artikel
  $scope.artikel = artikelService.getArtikelen().get({id:$scope.artikelId});

  //waardering
  getWaardering($scope.artikelId);

  //commentaren
  $scope.commentaren = artikelService.getArtikelCommentaren().query({artikelId:$scope.artikelId});

  $scope.commentaar = {};

  $scope.saveCommentaar = function() {
    // console.log('saveCommentaar bij: '+$scope.artikelId);
    $scope.commentaar.user = Ionic.User.current()._id;
    $scope.commentaar.datum = new Date();
    $scope.commentaar.artikelId = $scope.artikelId;
    artikelService.getArtikelCommentaren().save($scope.commentaar);
    $scope.commentaren.push($scope.commentaar);
    $scope.closePopCommentaar();
  }

  //rating readOnly faciliteit aangezetten:
  $scope.readOnly = true

  // sterren van user
  artikelService.getArtikelSterren().query({user: Ionic.User.current()._id, artikelId: $scope.artikelId})
    .$promise.then(function(response){
      // console.log('Al sterretjes: '+response.length);
      if (response.length===0) {
        // console.log('Nog geen sterretjes');
        $scope.userArtikel = {};
        $scope.userArtikel.sterren = 0;
        $scope.userArtikel.user = Ionic.User.current()._id;
      } else {
        $scope.userArtikel = response[0];
      }
      // $scope.userArtikel = userArtikel;
    }, function(err){
      console.log('Fout...'+err.statusText);
    });

  //artikelSter
  $scope.saveSterren = function() {
    // console.log('saveSterren');
    $scope.userArtikel.artikelId = $scope.artikel.id; 
    if ($scope.userArtikel.id) {
      artikelService.getArtikelSterren().update({id:$scope.userArtikel.id},$scope.userArtikel);
      // Zo kan het ook (als artikel uit $resource verkregen is):
      // $scope.userArtikel.$update({id:$scope.userArtikel.id});
    } else {
      // krijg userArtikel inclusief aangemaakt id terug.
      $scope.userArtikel = artikelService.getArtikelSterren().save($scope.userArtikel);
    }
  }

  // De Popover:
  $ionicPopover.fromTemplateUrl('templates/artikel-popover.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popover = popover;
    console.log('popover: '+$scope.popover);
  });


  $scope.openPopover = function($event) {
    // console.log('openPopover');
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };


  // De Commentaat Popover:
  $ionicPopover.fromTemplateUrl('templates/artikel-commentaar.html', {
    scope: $scope
  }).then(function(popover) {
    $scope.popcommentaar = popover;
    console.log('popover: '+$scope.popcommentaar);
  });


  $scope.openPopCommentaar = function($event) {
    // console.log('openPopover');
    $scope.popcommentaar.show($event);
  };
  $scope.closePopCommentaar = function() {
    $scope.popcommentaar.hide();
  };


  $scope.showBewaarAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Pak pen en papier',
      template: 'schrijven maar...'
    });

    alertPopup.then(function(res) {
      console.log('bewaarAlert');
    });
  };

  $scope.showLuisterAlert = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Luister goed',
      template: 'deze future is nog niet af ... het is de bedoeling dat ... nou ja ...'
    });

    alertPopup.then(function(res) {
      console.log('luisterAlert');
    });
  };

  //Is dit nu een lokale functie, of heeft ie een grotere scope gekregen doordat ie niet aan $scope hangt.
  //Ik gok eigenlijk grotere scope...
  function getWaardering(artikelId){
    var sterren = 0;
    var waarderingen = 0;
    var waardering = 0;
    // De verzameling ophalen:
    artikelService.getArtikelSterren().query({artikelId:artikelId}).$promise
    .then(function(response){
      // console.log("Gevonden waarderingen: "+ response.length);  
      for (var i=0;i<response.length;i++) {
        sterren += response[i].sterren;
        waarderingen++;
      }
      if (waarderingen>0) {
        waardering = sterren/waarderingen;
      } 
      $scope.waardering = {sterren:waardering,waarderingen:waarderingen};
    },
    function(error){
      console.log('Fout '+error.statusText);
    });  
  };

}]);
