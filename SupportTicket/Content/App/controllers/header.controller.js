
//  header controller
(function () {
    'use strict';

    angular
      .module('ticketApp')
      .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['configService'];

    function HeaderController(configService) {
        var vm = this;
        vm.hostUrl = hostweburl;
        vm.user = configService.user;
        configService.registerObserverCallback(function () {
            vm.user = configService.user;
        });
        

        //vm.user.email = configService.user.email;

        activate();

        function activate() { }
    }
})();



(function () {
    'use strict';
    angular
      .module('ticketApp')
      .controller('MenuController', [ '$scope', MenuController]);

    function MenuController($scope) {
        var vm = this;

        $scope.$on('routeChange', function (event, next, current) {
            vm.currentRoute = next;
        });

        vm.title = '';

        activate();

        function activate() { }
    }
})();
