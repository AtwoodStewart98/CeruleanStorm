angular
  .module("ceruleanstorm", ["ui.router"])
  .config(($urlRouterProvider, $stateProvider) => {
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
      })
      .state("art", {
        url: "/visual-art",
        templateUrl: "./components/visual-art/artTmpl.html",
        controller: "artCtrl"
      })
      .state("writing", {
        url: "/writing-forum",
        templateUrl: "./components/writing/writingTmpl.html"
      });
  });
