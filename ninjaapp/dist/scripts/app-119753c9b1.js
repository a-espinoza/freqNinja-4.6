!function(){"use strict";function t(){function t(){return e}var e=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Bootstrap",url:"http://getbootstrap.com/",description:"Bootstrap is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.",logo:"bootstrap.png"},{title:"Angular UI Bootstrap",url:"http://angular-ui.github.io/bootstrap/",description:"Bootstrap components written in pure AngularJS by the AngularUI Team.",logo:"ui-bootstrap.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"}];this.getTec=t}angular.module("freqNinja46").service("webDevTec",t)}(),function(){"use strict";function t(){function t(t){var e=this;e.relativeDate=t(e.creationDate).fromNow()}t.$inject=["moment"];var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return e}angular.module("freqNinja46").directive("acmeNavbar",t)}(),function(){"use strict";function t(t){function e(e,n,a,o){var r,i=t(n[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});n.addClass("acme-malarkey"),angular.forEach(e.extraValues,function(t){i.type(t).pause()["delete"]()}),r=e.$watch("vm.contributors",function(){angular.forEach(o.contributors,function(t){i.type(t.login).pause()["delete"]()})}),e.$on("$destroy",function(){r()})}function n(t,e){function n(){return a().then(function(){t.info("Activated Contributors View")})}function a(){return e.getContributors(10).then(function(t){return o.contributors=t,o.contributors})}var o=this;o.contributors=[],n()}n.$inject=["$log","githubContributor"];var a={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:e,controller:n,controllerAs:"vm"};return a}t.$inject=["malarkey"],angular.module("freqNinja46").directive("acmeMalarkey",t)}(),function(){"use strict";function t(t,e){function n(n){function o(t){return t.data}function r(e){t.error("XHR Failed for getContributors.\n"+angular.toJson(e.data,!0))}return n||(n=30),e.get(a+"/contributors?per_page="+n).then(o)["catch"](r)}var a="https://api.github.com/repos/Swiip/generator-gulp-angular",o={apiHost:a,getContributors:n};return o}t.$inject=["$log","$http"],angular.module("freqNinja46").factory("githubContributor",t)}(),function(){"use strict";angular.module("ninjaapp",["ngSanitize","ngMessages","ngAria","ui.router","ui.bootstrap","toastr","formio","ngFormioHelper"])}(),function(){"use strict";function t(t,e,n){function a(){r(),t(function(){i.classAnimation="rubberBand"},4e3)}function o(){n.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),i.classAnimation=""}function r(){i.awesomeThings=e.getTec(),angular.forEach(i.awesomeThings,function(t){t.rank=Math.random()})}var i=this;i.awesomeThings=[],i.classAnimation="",i.creationDate=1480615552211,i.showToastr=o,a()}t.$inject=["$timeout","webDevTec","toastr"],angular.module("ninjaapp").controller("MainController",t)}(),function(){"use strict";function t(t){t.init()}t.$inject=["FormioAuth"],angular.module("ninjaapp").run(t)}(),function(){"use strict";function t(t,n){t.state("home",{url:"/",templateUrl:"views/main.html",controller:["$scope","$http","Formio","$rootScope",function(t,n,a,o){t.events={},t.noEvents=!1,n.get(e+"/pilot/submission?owner="+o.user._id,{headers:{"x-jwt-token":a.getToken()}}).then(function(e){e.data.forEach(function(e){e.data.event&&e.data.event._id&&e.data.event.data.title&&(t.events[e.data.event._id]=e.data.event)}),t.noEvents=0===Object.keys(t.events).length}),n.get(e+"/event/submission?owner="+o.user._id,{headers:{"x-jwt-token":a.getToken()}}).then(function(e){e.data.forEach(function(e){e&&e._id&&e.data.title&&(t.events[e._id]=e)}),t.noEvents=0===Object.keys(t.events).length})}]}).state("find",{url:"/find",templateUrl:"views/event/find.html",controller:["$scope","$http","toastr","Formio","$state",function(t,n,a,o,r){t.eventName="",t.loading=!1,t.findEvent=function(){t.loading=!0,n.get(e+"/event/submission?data.name="+t.eventName.toLowerCase(),{headers:{"x-jwt-token":o.getToken()}}).then(function(e){t.loading=!1,e&&e.data&&e.data.length?r.go("event.view",{eventId:e.data[0]._id}):a.info("Event not found")})}}]}),n.otherwise("/")}t.$inject=["$stateProvider","$urlRouterProvider"];var e="https://xoxuiypfjnyifeu.form.io";angular.module("ninjaapp").config(t)}(),function(){"use strict";angular.module("ninjaapp").constant("malarkey",malarkey).constant("moment",moment)}(),function(){"use strict";function t(t,e,n,a,o){t.debugEnabled(!0),n.setBaseUrl("https://xoxuiypfjnyifeu.form.io"),a.setStates("auth.login","home"),a.setStates("auth.register","home"),a.setForceAuth(!0),a.register("login","user","user/login"),a.register("register","user","user/register");var r="https://xoxuiypfjnyifeu.form.io";o.register("event",r+"/event",{templates:{view:"views/event/view.html"},controllers:{view:["$scope","$stateParams","Formio","$http",function(t,e,n,a){t.selfies=[],a.get(r+"/selfie/submission?limit=100&data.group._id="+e.groupId,{headers:{"x-jwt-token":n.getToken()}}).then(function(e){t.selfies=e.data})}]}}),o.register("pilot",r+"/pilot",{parent:"event",controllers:{create:["$scope","$state","$stateParams",function(t,e,n){return t.$on("formSubmission",function(){e.go("event.view",{eventId:n.eventId})}),{handle:!0}}]}}),e.allowHtml=!0,e.timeOut=3e3,e.positionClass="toast-top-right",e.preventDuplicates=!0,e.progressBar=!0}t.$inject=["$logProvider","toastrConfig","FormioProvider","FormioAuthProvider","FormioResourceProvider"],angular.module("ninjaapp").config(t)}(),angular.module("ninjaapp").run(["$templateCache",function(t){t.put("app/main/main.html",'<div class=container><h1>test!</h1><div><acme-navbar creation-date=main.creationDate></acme-navbar></div><div class="jumbotron text-center"><h1>\'Allo, \'Allo!</h1><p class=lead><img src=assets/images/yeoman.png alt="I\'m Yeoman"><br>Always a pleasure scaffolding your apps.</p><p class="animated infinite" ng-class=main.classAnimation><button type=button class="btn btn-lg btn-success" ng-click=main.showToastr()>Splendid Toastr</button></p><p>With ♥ thanks to the contributions of<acme-malarkey extra-values="[\'Yeoman\', \'Gulp\', \'Angular\']"></acme-malarkey></p></div><div class=row><div class="col-sm-6 col-md-4" ng-repeat="awesomeThing in main.awesomeThings | orderBy:\'rank\'"><div class=thumbnail><img class=pull-right ng-src="assets/images/{{ awesomeThing.logo }}" alt="{{ awesomeThing.title }}"><div class=caption><h3>{{ awesomeThing.title }}</h3><p>{{ awesomeThing.description }}</p><p><a ng-href={{awesomeThing.url}}>{{ awesomeThing.url }}</a></p></div></div></div></div></div>'),t.put("app/components/navbar/navbar.html",'<nav class="navbar navbar-static-top navbar-inverse"><div class=container-fluid><div class=navbar-header><a class=navbar-brand href=https://github.com/Swiip/generator-gulp-angular><span class="glyphicon glyphicon-home"></span> Gulp Angular</a></div><div class="collapse navbar-collapse" id=bs-example-navbar-collapse-6><ul class="nav navbar-nav"><li class=active><a ng-href=#>Home</a></li><li><a ng-href=#>About</a></li><li><a ng-href=#>Contact</a></li></ul><ul class="nav navbar-nav navbar-right acme-navbar-text"><li>Application was created {{ vm.relativeDate }}.</li></ul></div></div></nav>')}]);
//# sourceMappingURL=../maps/scripts/app-119753c9b1.js.map
