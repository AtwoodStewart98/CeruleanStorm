angular
  .module("ceruleanstorm")
  .controller("forumCtrl", function($scope, forumSrvc) {
    $scope.submit = function(file) {
      console.log(file);
      forumSrvc.uploadImage(file);
    };
  });
