'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */

angular.module('yapp')
  .controller('DashboardCtrl', function($scope, $state, $firebaseArray, Auth) {

    $scope.$state = $state;

    $scope.auth = Auth;

    var refTypeInfo = firebase.database().ref().child("typeInfo");
    // create a synchronized array to typeInfo
    $scope.typeInfos = $firebaseArray(refTypeInfo);

    //TODO: static to variable
    $scope.typeInfo = 'phone';



    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;
    });

    $scope.menuItems = [];
    angular.forEach($state.get(), function (item) {
        if (item.data && item.data.visible) {
            $scope.menuItems.push({name: item.name, text: item.data.text});
        }
    });


    $scope.searchCode = function (code){

      try{
      //if($scope.firebaseUser){
        if(code){
          var refCodes = firebase.database().ref().child("codes").orderByChild("codeInfo").equalTo(code);
        }else{
          var refCodes = firebase.database().ref().child("codes");
        }

        // create a synchronized array to codes
        $scope.codes = $firebaseArray(refCodes);
       //}

    }catch(err){
          console.log(err);
    }
  };

  $scope.addInfo = function() {

    var refCodesAdd = firebase.database().ref().child("codes");
    // create a synchronized array to codes
    $scope.codesAdd = $firebaseArray(refCodesAdd);
    $scope.codesAdd.$add({
          msgInfo: $scope.msgInfo,
          typeInfo: $scope.typeInfo,
          user: $scope.firebaseUser.uid,
          codeInfo: $scope.codeInfo,
          timestamp: firebase.database.ServerValue.TIMESTAMP
    });
  };


  });
