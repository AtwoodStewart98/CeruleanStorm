angular.module("ceruleanstorm").service("forumSrvc", function($http) {
  this.postForum = text => console.log(text);
  $http
    .post("/writing-forum/writing")
    .then(response => response)
    .catch(error => error);
});
