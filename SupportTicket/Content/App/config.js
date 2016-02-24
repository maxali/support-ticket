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

            

            getCurrentUser(function (userInfo) {
                configServiceProvider.config(userInfo);
                getRequestDigest();
            });


            /*
            $.ajax({
                url: appweburl + "/_api/SP.AppContextSite(@target)/web/GetUserById(9)?@target='" + hostweburl + "'",
                method: "GET",
                headers: header,
                contentType: "application/json;odata=verbose",
                success: function (data) {
                    console.log(data);

                    });
                },
                error: function (err) {
                    console.log(err);
                }
            });

           
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



function getCurrentUser(cb) {
    var context = SP.ClientContext.get_current();
    var web = context.get_web();
    var currentUser = web.get_currentUser();
    context.load(currentUser);
    context.executeQueryAsync(function (data) {
        console.log(currentUser.get_loginName());

        var userInfo = {
            user: {
                id: currentUser.get_id(),
                name: currentUser.get_title(),
                email: currentUser.get_email(),
                picture: "https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=" + currentUser.get_email() + "&UA=0&size=HR64x64&sc=1456140360229" //scriptbase + "userphoto.aspx?size=L&username=" + currentUser.get_email()
            }
        };

        if (typeof cb == "function")
            cb(userInfo);
        else 
            return userInfo;
    }, function (err) {
        console.log(err);
    })
}



function getRequestDigest() {
    // get request Digest
    $.ajax({
        url: apiBase + "contextinfo",
        method: "POST",
        headers: { "Accept": "application/json; odata=verbose" },
        success: function (data) {
            requestDigest = data.d.GetContextWebInformation.FormDigestValue;
            return requestDigest;
        },
        error: function (data, errorCode, errorMessage) {
            alert(errorMessage)
        }
    });
}