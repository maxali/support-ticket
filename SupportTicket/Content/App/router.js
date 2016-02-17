// router
angular.module('ticketApp')
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "../Content/App/templates/ticket.html"
        });

});