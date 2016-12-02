(function() {
  'use strict';

  angular
    .module('ninjaapp')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, FormioProvider, FormioAuthProvider, FormioResourceProvider) {

    // Enable log
    $logProvider.debugEnabled(true);
    FormioProvider.setBaseUrl('https://xoxuiypfjnyifeu.form.io');
    FormioAuthProvider.setStates('auth.login', 'home');
    FormioAuthProvider.setStates('auth.register', 'home');
    FormioAuthProvider.setForceAuth(true);
    FormioAuthProvider.register('login', 'user', 'user/login');
    FormioAuthProvider.register('register', 'user', 'user/register');

    // This will be your events Form.io API url.
    var appUrl = 'https://xoxuiypfjnyifeu.form.io';
    FormioResourceProvider.register('event', appUrl + '/event', {
      templates: {
        view: 'views/event/view.html'
      },
      controllers: {
        view: [
          '$scope',
          '$stateParams',
          'Formio',
          '$http',
          function($scope, $stateParams, Formio, $http) {
            $scope.pilots = [];
            $http.get(appUrl + '/pilot/submission?limit=100&data.event._id=' + $stateParams.eventId, {
              headers: {
                'x-jwt-token': Formio.getToken()
              }
            }).then(function(result) {
              $scope.pilots = result.data;
            });
          }
        ]
      }
    });

    FormioResourceProvider.register('pilot', appUrl + '/pilot', {
      parent: 'event',
      controllers: {
        create: ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams) {
          $scope.$on('formSubmission', function() {
            $state.go('event.view', {eventId: $stateParams.eventId});
          });
          return {handle: true};
        }]
      }
    })

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }
})();
