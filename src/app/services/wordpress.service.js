(function() {
  'use strict';

  angular
    .module('website')
    .factory('wordpressService', wordpressService);

  wordpressService.$inject = ['$http', '$q'];

  function wordpressService($http, $q) {
    var apiHost = 'http://opengatecc.net/wordpress/wp-json';
    var wordpressRestApi = apiHost + '/wp/v2';

    return {
      getSiteInformation: getSiteInformation,
      getPageInformation: getPageInformation,
      getMenu: getMenu,
      getAllPages: getAllPages,
      getAllMedia: getAllMedia
    };

    function getSiteInformation() {
      return $http.get(apiHost)
        .then(function (response) {
          return response.data;
        })
        .catch(function (response) {
          return $q.reject({message: 'Unable to get site information', details: response.data});
        });
    }

    function getAllPages() {
      return $http.get(wordpressRestApi + '/pages')
        .then(function (response) {
          return response.data;
        })
        .catch(function (response) {
          return $q.reject({message: 'Unable to get information for all the pages', details: response.data});
        });
    }

    function getAllMedia() {
      return $http.get(wordpressRestApi + '/media')
        .then(function (response) {
          return response.data;
        })
        .catch(function (response) {
          return $q.reject({message: 'Unable to get information about the wordpress media', details: response.data});
        });
    }

    function getPageInformation(wordpressSlug) {
      return $http.get(wordpressRestApi + '/pages')
        .then(function (response){
          var pages = response.data;
          return _.find(pages, function(item){
            return item.slug === wordpressSlug;
          });
        })
        .then(function (wordpressPage) {
          var id = wordpressPage.id;
          return $http.get(wordpressRestApi + '/pages/' + id);
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (response) {
          return $q.reject({message: 'Unable to get information for the page ' + wordpressSlug, details: response.data});
        });

    }

    function getMenu(menuId) {
      return $http.get(apiHost + '/wp-api-menus/v2/menus')
        .then(function (response){
          var menus = response.data;
          return _.find(menus, function(item){
            return item.slug === menuId;
          });
        })
        .then(function (menu) {
          var id = menu.term_id;
          return $http.get(apiHost + '/wp-api-menus/v2/menus/' + id);
        })
        .then(function (response) {
          return response.data;
        })
        .catch(function (response) {
          return $q.reject({message: 'Unable to get information for the page ' + menuId, details: response.data});
        });
    }
  }
})();
