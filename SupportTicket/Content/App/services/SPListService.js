
(function () {
    'use strict';

    angular
      .module('ticketApp')
      .factory('$SPService', ['$http', 'spUtil', '$SPHttp', $SPService]);

    function $SPService($http, spUtil, $SPHttp) {
        var service = {
            list: {
                getItem: getListItem,
                getItems: getListItems,
                addItem: addListItem,
                updateItem: updateListItem
            }
        };

        function getListItem(listTitle, itemId) {
            return $SPHttp.get({
                url: spUtil.listItemGetEndpoint(listTitle, itemId),
            });
        }

        function getListItems(listTitle, $select, $filter) {
            return $SPHttp.get({
                url: spUtil.listGetEndpoint(listTitle, $select, $filter),
            });
        }

        function addListItem() {
        }

        function updateListItem() {
        }

        return service;
    }
})();
