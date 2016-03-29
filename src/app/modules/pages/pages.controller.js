(function() {
  'use strict';

  angular
    .module('website')
    .controller('PageController', PageController);

  PageController.$inject = ['$routeParams', 'wordpressService','menuProcessingService'];
  function PageController($routeParams, wordpressService, menuProcessingService) {
    var vm = this;

    activate();

    function activate() {

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
