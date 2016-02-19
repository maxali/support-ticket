
var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl")),
appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl")),
requestDigest = "",
appweburl = (appweburl.indexOf("#") !== -1) ? appweburl.substr(0, appweburl.indexOf("#")) : appweburl;
scriptbase = hostweburl + "/_layouts/15/",
apiBase = appweburl + "/_api/";
// fetch config data
angular.element(document).ready(function () {
    // Config app

    angular.module('ticketApp')
        .config(['configServiceProvider', function (configServiceProvider) {
            // Get current user
            var header = header || {};
            header["Accept"] = "application/json;odata=verbose";
            header["Content-Type"] = "application/json;odata=verbose";

            $.ajax({
                url: apiBase + "contextinfo",
                method: "POST",
                headers: { "Accept": "application/json; odata=verbose" },
                success: function (data) {
                    console.log(data);
                    requestDigest = data.d.GetContextWebInformation.FormDigestValue;
                },
                error: function (data, errorCode, errorMessage) {
                    alert(errorMessage)
                }
            });

            $.ajax({
                url: appweburl + "/_api/SP.AppContextSite(@target)/web/GetUserById(9)?@target='" + hostweburl + "'",
                method: "GET",
                headers: header,
                contentType: "application/json;odata=verbose",
                success: function (data) {
                    configServiceProvider.config({
                        user: {
                            name: data.d.Title,
                            email: data.d.Email,
                            picture: scriptbase + "userphoto.aspx?size=L&username=" + data.d.Email
                        }
                    });
                },
                error: function (err) {
                    console.log(err);
                }
            });

            /*
            var $cookies;
            angular.injector(['ngCookies']).invoke(['$cookies', function (_$cookies_) {
                $cookies = _$cookies_;
            }]);

            $cookies.put("hostWeb", hostweburl, { path: "/" });
            $cookies.put("appWeb", appweburl, { path: "/" });
            $cookies.put("scriptBase", scriptbase, { path: "/" });
            $cookies.put("apiBase", apiBase, { path: "/" });

            window.location.href = appweburl + "/Content/index.html";
            */
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