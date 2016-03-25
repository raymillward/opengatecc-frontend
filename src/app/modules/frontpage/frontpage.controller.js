(function() {
  'use strict';

  angular
    .module('website')
    .controller('FrontpageController', FrontpageController);

  FrontpageController.$inject = ['wordpressService','menuProcessingService'];
  function FrontpageController(wordpressService, menuProcessingService) {
    var vm = this;

    activate();

    function activate() {
      wordpressService.getSiteInformation()
        .then(function(data) {
          console.log(data.name);
          vm.name = data.name;
        })
        .catch(onError);

      menuProcessingService.getAndBuildMainMenu()
        .then(function(data) {
          console.log(data);
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
