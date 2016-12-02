(function() {
  'use strict';

  var appUrl = 'https://xoxuiypfjnyifeu.form.io';

  angular
    .module('ninjaapp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/pilot/create.html',
        controller: ['$scope', '$http', 'Formio', '$rootScope', function($scope, $http, Formio, $rootScope) {
          $scope.events = {};
          $scope.noEvents = false;

          // Get all of my pilots.
          $http.get(appUrl + '/pilot/submission?owner=' + $rootScope.user._id, {headers: {'x-jwt-token': Formio.getToken()}}).then(function(result) {
            result.data.forEach(function(pilot) {
              if (pilot.data.event && pilot.data.event._id && pilot.data.event.data.fullName) {
                $scope.events[pilot.data.event._id] = pilot.data.fullName;
              }
            });
            $scope.noEvents = (Object.keys($scope.events).length === 0);
          });

          // Get all of my events that I created.
          $http.get(appUrl + '/event/submission?owner=' + $rootScope.user._id, {headers: {'x-jwt-token': Formio.getToken()}}).then(function(result) {
            result.data.forEach(function(event) {
              if (event && event._id && event.data.eventName) {
                $scope.events[event._id] = event;
              }
            });
            $scope.noEvents = (Object.keys($scope.events).length === 0);
          });
        }]
      })
      .state('find', {
        url: '/find',
        templateUrl: 'views/event/find.html',
        controller: ['$scope', '$http', 'toastr', 'Formio', '$state', function($scope, $http, toastr, Formio, $state) {
          $scope.eventName = '';
          $scope.loading = false;
          $scope.findEvent = function() {
            $scope.loading = true;
            $http.get(appUrl + '/event/submission?data.eventName=' + $scope.eventName.toLowerCase(), {
              headers: {'x-jwt-token': Formio.getToken()}
            }).then(function(result) {
              $scope.loading = false;
              if (!result || !result.data || !result.data.length) {
                toastr.info('Event not found');
              }
              else {
                $state.go('event.view', {eventId: result.data.events});
              }
            });
          };
        }]
      });

    $urlRouterProvider.otherwise('/');
  }

})();
