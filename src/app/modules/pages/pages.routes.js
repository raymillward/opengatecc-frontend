(function() {
  'use strict';

  angular
    .module('website')
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/pages/:pageslug', {
        templateUrl: 'app/modules/pages/pages.html',
        controller: 'PageController',
        controllerAs: 'vm'
      });
  }

}());
