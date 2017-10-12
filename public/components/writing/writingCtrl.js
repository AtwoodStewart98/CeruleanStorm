angular
  .module("ceruleanstorm")
  .controller("writingCtrl", function($scope, writingSrvc, user) {
    $scope.getForum = writingSrvc.getForum().then(posts => {
      $scope.posts = posts.data;
    });
    console.log(user);
    $scope.user = user.data && user.data.err ? user.data.err : user;
  });
