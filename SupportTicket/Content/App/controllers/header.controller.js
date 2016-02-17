
//  header controller
(function () {
    'use strict';

    angular
      .module('ticketApp')
      .controller('headerController', headerController);

    headerController.$inject = ['configService'];
    function headerController(configService) {
        var vm = this;

        vm.user = {};
        vm.user.name = configService.userName;
        vm.user.email = configService.email;

        activate();

        function activate() { }
    }
})();
