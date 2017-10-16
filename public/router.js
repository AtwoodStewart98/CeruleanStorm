angular
  .module("ceruleanstorm", ["ui.router", "ngFileUpload"])
  .config(($urlRouterProvider, $stateProvider) => {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "./components/home/homeTmpl.html"
      })
      .state("music", {
        url: "/music",
        templateUrl: "./components/artists-music/musicTmpl.html"
      })
      .state("artist", {
        url: "/music/:artist",
        templateUrl: "./components/artists-music/artistTmpl.html"
      })
      .state("art", {
        url: "/visual-art",
        templateUrl: "./components/visual-art/artTmpl.html",
        controller: "artCtrl"
      })
      .state("writing", {
        url: "/writing-forum",
        templateUrl: "./components/writing/writingTmpl.html",
        controller: "forumCtrl"
      })
      .state("forum", {
        url: "/writing-forum/writing",
        templateUrl: "./components/writing/forum/forumTmpl.html",
        controller: "writingCtrl",
        resolve: {
          user: loginSrvc =>
            loginSrvc
              .getUser()
              .then(resp => resp.data)
              .catch(err => err)
        }
      })
      .state("login", {
        url: "/login",
        templateUrl: "./components/login/loginTmpl.html",
        controller: "loginCtrl",
        resolve: {
          user: loginSrvc =>
            loginSrvc
              .getUser()
              .then(resp => resp.data)
              .catch(err => err)
        }
      });
  });
