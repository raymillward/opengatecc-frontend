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

      wordpressService.getAllMedia()
        .then(function(data){
          vm.media = data;
          vm.siteLogo = _.find(vm.media, function(item){
            return item.slug === 'site-logo';
          }).media_details.sizes.medium.source_url;
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
