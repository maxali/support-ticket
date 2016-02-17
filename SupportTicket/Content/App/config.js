

// fetch config data
angular.element(document).ready(function () {
    hostweburl = decodeURIComponent( getQueryStringParameter("SPHostUrl").replace("#", "") );
    appweburl =  decodeURIComponent( getQueryStringParameter("SPAppWebUrl").replace("#", ""));
    
    var scriptbase = hostweburl + "/_layouts/15/";


    // Config app
    var header = header || {};
    header["Accept"] = "application/json;odata=verbose";
    header["Content-Type"] = "application/json;odata=verbose";

    angular.module('ticketApp')
        .config(['configServiceProvider', function (configServiceProvider) {
            // Get current user
            $.ajax({
                url: appweburl + "/_api/SP.AppContextSite(@target)/web/GetUserById(9)?@target='" + hostweburl + "'",
                method: "GET",
                headers: header,
                contentType: "application/json;odata=verbose",
                success: function (data) {
                    console.log(data.d);
                    configServiceProvider.config({
                        userName: data.d.Title,
                        email: data.d.Email,
                        profilePic: scriptbase + "userphoto.aspx?size=L&username=" + data.d.Email
                    });
                },
                error: function (err) {
                    console.log(err);
                }
            });

        }]);
    
    angular.bootstrap('body', ['ticketApp']);
    /*
 
    var essentialScripts = [
        'SP.RequestExecutor.js'
    ];

    $.getMultiScripts(essentialScripts, scriptbase).done(function () {

    });

    */


});

function getQueryStringParameter(paramToRetrieve) {
    var params =
        document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}
$.getMultiScripts = function (arr, path) {
    var _arr = $.map(arr, function (scr) {
        return $.getScript((path || "") + scr);
    });

    _arr.push($.Deferred(function (deferred) {
        $(deferred.resolve);
    }));

    return $.when.apply($, _arr);
}