angular
  .module("ceruleanstorm")
  .controller("forumCtrl", function($scope, forumSrvc, user) {
    $scope.createPost = function(username, text) {
      forumSrvc.postForum(username, text);
    };

    $scope.getForum = forumSrvc.getForum().then(posts => {
      $scope.posts = posts.data;
    });

    $scope.user = user.data && user.data.err ? user.data.err : user;
  });
