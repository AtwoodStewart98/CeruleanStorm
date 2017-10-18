angular
  .module("ceruleanstorm")
  .controller("homeCtrl", function($scope, homeSrvc) {
    $scope.sendEmail = function(name, email, subject, message) {
      homeSrvc.sendEmail(name, email, subject, message);
    };
  });
