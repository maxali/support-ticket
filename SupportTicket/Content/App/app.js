﻿var ticketApp;
(function () {
    'use strict';

    ticketApp = angular.module('ticketApp', [
        'ngRoute',
        'ngAnimate',
        'ngCookies',
        'ngSanitize'
    ])

    .run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            $rootScope.$broadcast("routeChange", next.params);
            //console.log(next.params["status"]);
        });
    }])
  

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


