
(function () {
    'use strict';

    angular
      .module('ticketApp')
      .factory('$SPHttp', ['configService', '$http', $SPHttp]);

    function $SPHttp(configService, $http) {
        var service = {
            get: get
        };

        function get(options) {
            return $http({
                method: 'GET',
                url: options.url,
                headers: {
                    "Accept": "application/json; odata=verbose",
                    "Content-Type": "application/json; odata=verbose"
                }
            });
        }

        return service;
    }
})();
