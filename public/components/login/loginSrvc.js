angular.module("ceruleanstorm").service("loginSrvc", function($http) {
  this.getUser = () =>
    $http
      .get("/auth/me")
      .then(resp => resp)
      .catch(err => console.log("You dun goofed"));
});
