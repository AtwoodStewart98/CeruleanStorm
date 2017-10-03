angular.module("ceruleanstorm").config(($urlRouterProvider, $stateProvider) => {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state("home", {
      url: "/",
      templateUrl: "./components/home/homeTmpl.html"
      // controller: "homeCtrl"
      // resolve: {
      //   user: mainSrvc =>
      //     mainSrvc
      //       .getUser()
      //       .then(response => response.data)
      //       .catch(err => err)
      // }
    })
    .state("music", {
      url: "/music",
      templateUrl: "./components/artists-music/musicTmpl.html",
      controller: "musicCtrl"
    });
});
