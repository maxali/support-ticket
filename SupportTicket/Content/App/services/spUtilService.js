﻿
(function () {
    'use strict';

    angular
      .module('ticketApp')
      .factory('spUtil', ['configService', '$SPHttp','$q', spUtil]);

    function spUtil(configService, $SPHttp, $q) {
        var service = {
        	listGetEndpoint: listGetEndpoint,
        	getPictureByUser: getPictureByUser
        };
				
        function getPictureByUser(accountName, cb) {
        	var executor = new SP.RequestExecutor(appweburl);

        	var picCacheId = "pic" + accountName;
        	var picCache = localStorage.getItem(picCacheId);
        	if (picCache) {
        		cb(picCache);
        		return;
        	}

        	executor.executeAsync(
							{
								url:
										appweburl +
										"/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)" +
										"?$select=DisplayName,Email,PictureUrl" +
										"&@v='" + encodeURIComponent(accountName) + "'&@target='" + hostweburl + "'",
								method: "GET",
								headers: { "Accept": "application/json; odata=verbose", "Content-Type": "application/json; odata=verbose" },
								success: function (data) {
									var dataBody = JSON.parse(data.body);

									// cache pictureUrl
									if (dataBody.d.PictureUrl)
										localStorage.setItem(picCacheId, dataBody.d.PictureUrl);

									// return pictureUrl
									cb(dataBody.d.PictureUrl);
								},
								error: function(err) {
									cb(err)
								}
							}
					);
        }

        function listItemGetEndpoint(listTitle, itemId, $select, $filter) {
            var url = "";
            url += apiBase;
            url += "/lists/getByTitle('" + listTitle + "')/items/getItemById("+itemId+")";
            url += ($select) ? "?$select=" + $select + "&" : "?";
            url += ($filter) ? "$filter=" + $filter : "";

            return url;
        }

        function listGetEndpoint(listTitle, $select, $filter) {
            var url = "";
            url += apiBase;
            url += "/lists/getByTitle('" + listTitle + "')/items";
            url += ($select) ? "?$select=" + $select + "&" : "?";
            url += ($filter) ? "$filter=" + $filter : ""; 

            return url;
        }

        return service;
    }
})();
