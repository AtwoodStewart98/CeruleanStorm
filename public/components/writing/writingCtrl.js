angular
  .module("ceruleanstorm")
  .controller("writingCtrl", function($scope, writingSrvc) {
    $scope.getForum = writingSrvc.getForum().then(posts => {
      $scope.posts = posts.data;
    });
  });
