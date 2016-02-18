
(function () {
    'use strict';

    angular
      .module('ticketApp')
      .factory('spUtil', ['configService', spUtil]);

    function spUtil(configService) {
        var service = {
            listGetEndpoint: listGetEndpoint
        };

        function listItemGetEndpoint(listTitle, itemId, $select, $filter) {
            var url = "";
            url += apiBase;
            url += "/lists/getByTitle('" + listTitle + "')/items/getItemById("+itemId+")";
            url += ($select) ? "?$select=" + $select + "&" : "?";
            url += ($filter) ? "$filter=" + $filter : "";

            return url;
        }

        function listGetEndpoint(listTitle, $select, $filter) {
            var url = "";
            url += apiBase;
            url += "/lists/getByTitle('" + listTitle + "')/items";
            url += ($select) ? "?$select=" + $select + "&" : "?";
            url += ($filter) ? "$filter=" + $filter : ""; 

            return url;
        }

        return service;
    }
})();
