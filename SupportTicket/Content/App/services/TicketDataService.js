
(function () {
    'use strict';

    angular
      .module('ticketApp')
      .factory('SPDataService', ['$scope', SPDataService]);

    function SPDataService($scope) {
        var service = {
            execQuery: execQuery
        };

        function execQuery() {

        }

        return service;
    }
})();
