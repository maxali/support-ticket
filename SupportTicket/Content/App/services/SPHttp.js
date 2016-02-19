
(function () {
    'use strict';

    angular
      .module('ticketApp')
      .factory('$SPHttp', ['configService', '$http', $SPHttp]);

    function $SPHttp(configService, $http) {
        var service = {
            get: get,
            post: post
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

        function post(options) {
            return $http({
                method: 'POST',
                url: options.url,
                headers: options.headers || {
                    "Accept": "application/json; odata=verbose",
                    "Content-Type": "application/json; odata=verbose"
                },
                data: options.data || ""
            });
        }

        return service;
    }
})();
