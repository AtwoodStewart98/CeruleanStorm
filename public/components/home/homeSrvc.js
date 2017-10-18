angular.module("ceruleanstorm").service("homeSrvc", function($http) {
  this.sendEmail = (name, email, subject, message) => {
    return $http
      .post("/contact", { name, email, subject, message })
      .then(response => response)
      .catch(error => error);
  };
});
