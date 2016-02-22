// router
angular.module('ticketApp')
.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/tickets', {
            templateUrl: "../Content/App/templates/ticket.html",
            title: "Support Tickets"
        })
        .when('/tickets/status/:status', {
            templateUrl: "../Content/App/templates/ticket.html",
            title: "Support Ticket Status"
        })
        .when('/tickets/new', {
            templateUrl: "../Content/App/templates/ticket.new.html",
            title: "Create Support Ticket"
        })
        .when('/ticket/:id', {
            templateUrl: "../Content/App/templates/ticket.detail.html"
        })
        .otherwise("/tickets");

});