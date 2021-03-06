(function() {
  'use strict';

  angular
    .module('website')
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/modules/frontpage/frontpage.html',
        controller: 'FrontpageController',
        controllerAs: 'vm'
      });
  }

})();
