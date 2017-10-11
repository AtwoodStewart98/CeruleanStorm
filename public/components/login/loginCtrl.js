angular
  .module("ceruleanstorm")
  .controller("loginCtrl", function($scope, user, loginSrvc) {
    console.log("Hit");
    $scope.user = user.data && user.data.err ? user.data.err : user;
  });
