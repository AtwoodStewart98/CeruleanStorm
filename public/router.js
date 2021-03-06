angular
  .module("ceruleanstorm", ["ui.router", "ngFileUpload", "ngPageTitle"])
  .config(($urlRouterProvider, $stateProvider) => {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "./components/home/homeTmpl.html",
        data: {
          pageTitle: "Cerulean Storm | Home"
        },
        controller: "homeCtrl"
      })
      .state("music", {
        url: "/music",
        templateUrl: "./components/artists-music/musicTmpl.html",
        data: {
          pageTitle: "Cerulean Storm | Music"
        }
      })
      .state("cinema-for-the-blind", {
        url: "/music/cinema-for-the-blind",
        templateUrl: "./components/artists-music/artists/c4bTmpl.html",
        data: {
          pageTitle: "Cerulean Storm | Cinema for the Blind"
        }
      })
      .state("nessen", {
        url: "/music/nessen",
        templateUrl: "./components/artists-music/artists/nessenTmpl.html",
        data: {
          pageTitle: "Cerulean Storm | NesseN"
        }
      })
      .state("art", {
        url: "/visual-art",
        templateUrl: "./components/visual-art/artTmpl.html",
        data: {
          pageTitle: "Cerulean Storm | Visual Art"
        }
      })
      .state("writing", {
        url: "/writing-forum",
        templateUrl: "./components/writing/writingTmpl.html",
        data: {
          pageTitle: "Cerulean Storm | Forum"
        },
        controller: "writingCtrl",
        resolve: {
          user: loginSrvc =>
            loginSrvc
              .getUser()
              .then(resp => resp.data)
              .catch(err => err)
        }
      })
      .state("forum", {
        url: "/writing-forum/writing",
        templateUrl: "./components/writing/forum/forumTmpl.html",
        data: {
          pageTitle: "Cerulean Storm | Forum"
        },
        controller: "forumCtrl",
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
        data: {
          pageTitle: "Cerulean Storm | Login"
        },
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
