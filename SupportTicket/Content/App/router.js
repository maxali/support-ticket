// router
angular.module('ticketApp')
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "../Content/App/templates/ticket.html"
        })
        .when('/ticket/:id', {
            templateUrl: "../Content/App/templates/ticket.detail.html"
        });

});