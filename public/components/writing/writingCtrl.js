angular
  .module("ceruleanstorm")
  .controller("writingCtrl", function($scope, writingSrvc, user) {
    $scope.createPost = function(username, text) {
      console.log(text, username);
      console.log("Controller hit");
      writingSrvc.postForum(username, text);
    };

    $scope.getForum = writingSrvc.getForum().then(posts => {
      $scope.posts = posts.data;
    });

    $scope.user = user.data && user.data.err ? user.data.err : user;
  });
