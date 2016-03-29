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
      var menuPromise = wordpressService.getMenu('main');
      var pagePromise = wordpressService.getAllPages();

      return $q.all([menuPromise,pagePromise])
        .then(function(values){
          var menu = values[0];
          var pages = values[1];

          return extractMenuItems(menu, pages);
        })
        .catch(function (response) {
          return $q.reject({message: 'Unable to build main menu', details: response.data});
        });
    }

    function extractMenuItems(menu, pages) {
      var items = menu.items;

      var menuItems = [];
      _.forEach(items, function(item){
        var convertedItem = buildMenuItem(item, pages);

        menuItems.push(convertedItem);
      });

      return menuItems;
    }

    function buildMenuItem(item, pages) {
      var convertedItem = {
        name: item.title,
        id: item.object_id,
        object: item.object,
        link: buildMenuItemLink(item, pages)
      };

      if (item.children !== undefined && item.children.length > 0) {
        var children = [];
        _.forEach(item.children, function(child){
          children.push(buildMenuItem(child, pages));
        });

        convertedItem.children = children;
      }

      return convertedItem;
    }

    function buildMenuItemLink(item, pages) {
      var link = "";

      if (item.object === 'page') {
        var matchingPage = _.find(pages, function(page) {
          return page.id === item.object_id;
        });

        link = '/pages/' + matchingPage.slug;
      }

      return link;
    }
  }
})();
