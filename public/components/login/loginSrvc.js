angular.module("ceruleanstorm").service("loginSrvc", function($http) {
  console.log("Gotcha");
  this.getUser = () =>
    $http
      .get("/auth/me")
      .then(response => response)
      .catch(err => console.log("You dun goofed"));
});
