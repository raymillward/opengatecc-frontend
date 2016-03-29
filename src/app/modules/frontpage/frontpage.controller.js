(function() {
  'use strict';

  angular
    .module('website')
    .controller('FrontpageController', FrontpageController);

  FrontpageController.$inject = ['$route', 'wordpressService','menuProcessingService'];
  function FrontpageController($route, wordpressService, menuProcessingService) {
    var vm = this;

    activate();

    function activate() {

      console.log($route.routes);

      wordpressService.getSiteInformation()
        .then(function(data) {
          vm.name = data.name;
        })
        .catch(onError);

      menuProcessingService.getAndBuildMainMenu()
        .then(function(data) {
          vm.mainMenu = data;
        })
        .catch(onError);

      wordpressService.getPageInformation('frontpage')
        .then(function(data) {
          vm.pageContent = data.content.rendered;
        })
        .catch(onError);
    }

    function onError(error) {
      vm.error = error;
    }
  }
})();
