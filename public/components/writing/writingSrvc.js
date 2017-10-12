angular.module("ceruleanstorm").service("writingSrvc", function($http) {
  this.getForum = () =>
    $http
      .get("/writing-forum/writing")
      .then(response => response)
      .catch(error => error);
  this.postForum = (username, text) => {
    console.log(username, text);
    return $http
      .post("/writing-forum/writing", { username, text })
      .then(response => response)
      .catch(error => error);
  };
});
