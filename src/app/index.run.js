(function() {
  'use strict';

  angular.module('ninjaapp').run(runBlock);

  /** @ngInject */
  function runBlock(FormioAuth) {
    FormioAuth.init();
  }
})();
