
//  header controller
(function () {
    'use strict';

    angular
      .module('ticketApp')
      .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['configService'];

    function HeaderController(configService) {
        var vm = this;
        vm.user = configService.user;
        configService.registerObserverCallback(function () {
            vm.user = configService.user;
        });
        

        //vm.user.email = configService.user.email;

        activate();

        function activate() { }
    }
})();
