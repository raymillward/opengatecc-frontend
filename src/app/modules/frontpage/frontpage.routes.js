(function() {
  'use strict';

  angular
    .module('website')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/frontpage', {
        templateUrl: 'app/modules/frontpage/frontpage.html',
        controller: 'FrontpageController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
