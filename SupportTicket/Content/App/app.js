var ticketApp;
(function () {
    'use strict';

    ticketApp = angular.module('ticketApp', [
        'ngRoute'
    ])
  

    .provider('configService', function () {
        var observerCallbacks = [];
        var options = {
            //register an observer
            registerObserverCallback: function (callback) {
                observerCallbacks.push(callback);
            }
        }

        this.config = function (opt) {
            angular.extend(options, opt);
            notifyObservers();
        };

        this.$get = [function () {
            if (!options) {
                throw new Error('Config options must be configured');
            }
            return options;
        }];

        var notifyObservers = function () {
            angular.forEach(observerCallbacks, function (callback) {
                callback();
            });
        };

    });


})();


