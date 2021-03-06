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

    // This will be your groups Form.io API url.
    var appUrl = 'https://xoxuiypfjnyifeu.form.io';
    FormioResourceProvider.register('event', appUrl + '/event', {
      templates: {
        view: 'views/event/view.html'
      },
      controllers: {
        create: [
          '$scope',
          function($scope) {
            $scope.submission.data.status = 'open';
          }
        ],
        view: [
          '$scope',
          '$stateParams',
          'Formio',
          '$http',
          function($scope, $stateParams, Formio, $http) {
            $scope.selfies = [];
            $http.get(appUrl + '/selfie/submission?limit=100&data.group._id=' + $stateParams.groupId, {
              headers: {
                'x-jwt-token': Formio.getToken()
              }
            }).then(function(result) {
              $scope.selfies = result.data;
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
