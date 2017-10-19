angular.module("ceruleanstorm").service("forumSrvc", function($http) {
  this.getForum = () =>
    $http
      .get("/writing-forum/writing")
      .then(response => response)
      .catch(error => error);
  this.postForum = (username, text) => {
    return $http
      .post("/writing-forum/writing", { username, text })
      .then(response => response)
      .catch(error => error);
  };
});
