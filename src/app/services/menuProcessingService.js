(function() {
  'use strict';

  angular
    .module('website')
    .factory('menuProcessingService', menuProcessingService);

  menuProcessingService.$inject = ['$q', 'wordpressService'];

  function menuProcessingService($q, wordpressService) {

    return {
      getAndBuildMainMenu: getAndBuildMainMenu
    };

    function getAndBuildMainMenu() {
      return wordpressService.getMenu('main')
        .then(function (response) {
          console.log(response);
          return extractMenuItems(response);
        })
        .catch(function (response) {
          return $q.reject({message: 'Unable to build main menu', details: response.data});
        });
    }

    function extractMenuItems(menu) {
      var items = menu.items;

      var menuItems = [];
      _.forEach(items, function(item){
        var convertedItem = buildMenuItem(item);

        menuItems.push(convertedItem);
      });

      return menuItems;
    }

    function buildMenuItem(item) {
      var convertedItem = {
        name: item.title,
        id: item.id
      };

      if (item.children !== undefined && item.children.length > 0) {
        var children = [];
        _.forEach(item.children, function(child){
          children.push(buildMenuItem(child));
        });

        convertedItem.children = children;
      }

      return convertedItem;
    }
  }
})();
