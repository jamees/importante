'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:LoginController
 * @description
 * # LoginCtrl
 * Controller of yapp
 */


angular.module('yapp').controller("LoginCtrl", ["$scope", "Auth", "$location",
    function($scope, Auth, $location) {


      $scope.auth = Auth;

      // any time auth state changes, add the user data to scope
      $scope.auth.$onAuthStateChanged(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
        if($scope.firebaseUser){
           $scope.userName = firebaseUser.displayName;
           $location.path('/dashboard');
           return false;
        }

      });

      $scope.auth.$waitForSignIn(function(firebaseUser) {
        console.log('waiting');
      });

      $scope.loginFacebook = function (){
          $scope.auth.$signInWithRedirect('facebook');
      };
    }
  ]);
