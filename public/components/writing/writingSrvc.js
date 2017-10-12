angular.module("ceruleanstorm").service("writingSrvc", function($http) {
  this.getForum = () =>
    $http
      .get("/writing-forum/writing")
      .then(response => response)
      .catch(error => error);
});
