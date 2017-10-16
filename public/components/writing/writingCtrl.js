angular
  .module("ceruleanstorm")
  .controller("writingCtrl", function($scope, writingSrvc, user) {
    $scope.user = user.data && user.data.err ? user.data.err : user;

    $scope.submit = function(file, user) {
      console.log(file, user);
      writingSrvc.uploadImage(file, user);
    };
  });
