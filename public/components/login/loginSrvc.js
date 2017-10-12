angular.module("ceruleanstorm").service("loginSrvc", function($http) {
  this.getUser = () =>
    $http
      .get("/auth/me")
      .then(response => response)
      .catch(err => console.log("You dun goofed"));
});
