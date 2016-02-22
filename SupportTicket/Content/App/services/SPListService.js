
(function () {
    'use strict';

    angular
      .module('ticketApp')
      .factory('$SPService', ['$http', 'spUtil', '$SPHttp', $SPService]);

    function $SPService($http, spUtil, $SPHttp) {
        var service = {
            list: {
                getItem: getListItem,
                getItems: getListItems,
                addItem: addListItem,
                updateItem: updateListItem
            },
            searchUser: searchUser
        };

        function getListItem(listTitle, itemId) {
            return $SPHttp.get({
                url: spUtil.listItemGetEndpoint(listTitle, itemId),
            });
        }

        function getListItems(listTitle, $select, $filter) {
            return $SPHttp.get({
                url: spUtil.listGetEndpoint(listTitle, $select, $filter),
            });
        }

        function addListItem() {
        }

        function updateListItem() {
        }

        function searchUser(keyword, cb) {
            var searchKeywork = keyword;
            var restSource = apiBase + "SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser";
            var principalType = 1; // USER. Choices are All - 15, Distribution List - 2 , Security Groups - 4,  SharePoint Groups – 8, User – 1. These values can be combined.

            if (searchKeywork.length > 2)
                $SPHttp.post({
                    'url': restSource,
                    'data': JSON.stringify({
                        'queryParams': {
                            '__metadata': {
                                'type': 'SP.UI.ApplicationPages.ClientPeoplePickerQueryParameters'
                            },
                            'AllowEmailAddresses': true,
                            'AllowMultipleEntities': false,
                            'AllUrlZones': false,
                            'MaximumEntitySuggestions': 50,
                            'PrincipalSource': 15,
                            'PrincipalType': principalType,
                            'QueryString': searchKeywork
                            //'Required':false,
                            //'SharePointGroupID':null,
                            //'UrlZone':null,
                            //'UrlZoneSpecified':false,
                            //'Web':null,
                            //'WebApplicationID':null
                        }
                    }),
                    'headers': {
                        'accept': 'application/json;odata=verbose',
                        'content-type': 'application/json;odata=verbose',
                        'X-RequestDigest': requestDigest
                    }
                }).then(function (data) {
                    var d = data;

                    var results = JSON.parse(data.data.d.ClientPeoplePickerSearchUser);
                    if (results.length > 0) {
                        $.each(results, function (i, item) {
                            console.log(item)
                            item.image = scriptbase + "userphoto.aspx?size=L&username=" + item.EntityData.Email
                        });

                        cb(results);
                    }
                },function (err) {
                    alert(JSON.stringify(err));
                });


        }
        return service;
    }
})();
