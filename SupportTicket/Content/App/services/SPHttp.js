
(function () {
    'use strict';

    angular
      .module('ticketApp')
      .factory('$SPHttp', ['configService', '$http', $SPHttp]);

    function $SPHttp(configService, $http) {
        var service = {
            get: get,
            post: post,
            update: update
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
                    "Content-Type": "application/json; odata=verbose",
                    "X-RequestDigest": requestDigest
                },
                data: options.data || ""
            });
        }

        function update(options) {
            return $http({
                method: 'POST',
                url: options.url,
                headers: options.headers || {
                    "Accept": "application/json; odata=verbose",
                    "Content-Type": "application/json; odata=verbose",
                    "X-RequestDigest": requestDigest,
                    "X-Http-Method": "PATCH",
                    "If-Match": "*"

                },
                data: options.data || ""
            });
        }
        return service;
    }
})();
