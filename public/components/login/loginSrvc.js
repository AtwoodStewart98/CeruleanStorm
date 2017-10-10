angular.module("ceruleanstorm").service("loginSrvc", function($http) {
  this.getUser = () => $http.get("/auth/me");
});
