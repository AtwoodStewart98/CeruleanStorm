angular
  .module("ceruleanstorm")
  .controller("forumCtrl", function($scope, forumSrvc, user) {
    console.log("controller");
    $scope.createPost = function(text) {
      console.log(text);
      console.log("Controller hit");
      forumSrvc
        .postForum(text)
        .then(resp => resp)
        .catch(err => err);
    };

    $scope.user = user.data && user.data.err ? user.data.err : user;
  });
