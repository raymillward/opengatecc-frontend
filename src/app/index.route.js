(function() {
  'use strict';

  angular
    .module('website')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  }

})();
