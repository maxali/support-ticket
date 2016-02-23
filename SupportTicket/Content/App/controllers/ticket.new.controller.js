//TicketController
(function () {
    'use strict';

    angular
        .module('ticketApp')
        .controller('TicketNewController', TicketNewController);
    TicketNewController.$inject = ['$scope', '$SPHttp', 'configService', '$SPService', '$routeParams'];
	
    function TicketNewController($scope, $SPHttp, configService, $SPService, $routeParams) {
        var vm = this;
				// peoplPicker control list
        vm.peoplePicker = [];

        vm.ticket = {
        	requestTitle: "",
					key: "",
					requestBody: "",
					requestType: "",
        	assignedTo: ""
        };

        vm.saveTicket = function () {
        		if (!vm.ticket.requestTitle)
        			return false;

        		if ( vm.ticket.key !== "") {
        				// We need UserId to save Person/Group.
        				// get UserId by accountName eks. i:0#.f|membership|user@xx.onmic..com
        				var accountName = vm.ticket.key;
        				$SPHttp.get({
        					url: apiBase + "web/siteusers(@v)?@v='" + encodeURIComponent(accountName) + "'",
        				}).then(function (data) {
        						vm.ticket.assignedTo = data.data.d.Id;
        				}, function (error) {
        						alert("Cannot complete this. Cannot AssignTo the selected user.");
        						return false;
        				});
        		} else {
        				vm.ticket.assignedTo = 0;
        		}

        		var requestData = {
        				__metadata: { 'type': 'SP.Data.RequestListItem' },
        				Title: vm.ticket.requestTitle,
        				Body: vm.ticket.requestBody
        		};

        		if (vm.ticket.requestType !== "")
        				requestData.RequestType = vm.ticket.requestType;

        		if (vm.ticket.assignedTo > 0)
        				requestData.AssignedToId = vm.ticket.assignedTo;
            
        		console.log(requestData);
						//if(!vm.ticket.requestTitle)
        		$SPHttp.post({
        				url: apiBase + "web/lists/getByTitle('Request')/Items",
								data: requestData
        		}).then(function (data) {
        				if (data.statusText == "Created")
        						$.Notify({
        							caption: 'Successful',
        							content: 'Request added successfully.',
        							type: 'success'
        						});
        		}, function (error) {
        				console.log(error);
        		});
        }
        
        
        vm.search = function () {
            $SPService.searchUser(vm.ticket.searchBox, function (result) {
                vm.peoplePicker = result;
            });
        }
    }
})();

