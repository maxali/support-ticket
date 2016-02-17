var ticketApp;
(function () {
    'use strict';

    ticketApp = angular.module('ticketApp', [
        'ngRoute'
    ])

    // Configuration provider
    .provider('configService', function () {
        var options = {};
        this.config = function (opt) {
            console.log(opt);
            angular.extend(options, opt);
        };

        this.$get = [function () {
            if (!options) {
                throw new Error('Config options must be configured');
            }
            return options;
        }];
    });


})();


