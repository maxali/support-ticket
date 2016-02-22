﻿<!DOCTYPE HTML>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Support Ticket</title>

    <!-- Add your CSS styles to the following file -->
    <link href="../Content/matro-ui/css/metro.min.css" rel="stylesheet" />
    <link href="../Content/matro-ui/css/metro-icons.min.css" rel="stylesheet" />
    <link href="../Content/matro-ui/css/metro-responsive.min.css" rel="stylesheet" />

    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Office UI Components -->
    <link href="../Content/matro-ui/css/fabric.min.css" rel="stylesheet" />
    <link href="../Content/matro-ui/css/fabric.components.min.css" rel="stylesheet" />

    <script type="text/javascript" src="/_layouts/1033/init.js"></script>
    <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/_layouts/15/init.js"></script>
    <script type="text/javascript" src="/_layouts/15/core.js"></script>
    <script type="text/javascript" src="/_layouts/15/SP.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/SP.js"></script>
    <script type="text/javascript" src="/_layouts/15/SP.init.js"></script>
    <script type="text/javascript" src="/_layouts/15/SP.core.js"></script>
    <script type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>

    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script src="../Scripts/angular.min.js"></script>
    <script src="../Scripts/angular-route.min.js"></script>
    <script src="../Scripts/angular-sanitize.js"></script>
    <script src="../Scripts/angular-animate.min.js"></script>
    <script src="../Scripts/angular-cookies.min.js"></script>

    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script src="../Content/matro-ui/js/office-ui-components.js"></script>    
    <script src="../Content/matro-ui/js/metro.js"></script>

    <!-- Angular ticketApp files -->
    <script src="../Content/App/app.js"></script>

    <script src="../Content/App/router.js"></script>
    <script src="../Content/App/config.js"></script>
    <script src="../Content/App/services/spUtilService.js"></script>
    <script src="../Content/App/services/SPListService.js"></script>
    <script src="../Content/App/services/SPHttp.js"></script>
    <script src="../Content/App/services/TicketDataService.js"></script>
    <script src="../Content/App/controllers/header.controller.js"></script>
    <script src="../Content/App/controllers/ticket.controller.js"></script>
    <script src="../Content/App/controllers/ticket.detail.controller.js"></script>
    <script src="../Content/App/controllers/ticket.new.controller.js"></script>

</head>
<body style="background: rgba(222, 222, 222, 0.56);">
    <div class="app-bar fixed-top darcula" data-role="appbar" ng-controller="HeaderController as vm">
        <a class="app-bar-element branding" href="{{vm.hostUrl}}">SharePoint </a>
        <span class="app-bar-divider"></span>
        <ul class="app-bar-menu">
            <li style="margin-left: 100px"><a href="">Support Ticket</a></li>
        </ul>

        <div class="app-bar-element no-padding-right place-right">
            <span class="dropdown-toggle"><span class="mif-cog"></span>
                {{vm.user.name}}             
            </span>
            <div class="app-bar-drop-container padding10 place-right no-margin-top block-shadow fg-dark" data-role="dropdown" data-no-close="true" style="width: 220px">
                <h2 class="text-light">Quick settings</h2>
                <ul class="unstyled-list fg-dark">
                    <li><a href="{{vm.hostUrl}}/_layouts/15/userdisp.aspx" class="fg-white2 fg-hover-yellow">My Settings</a></li>
                    <li><a href="" class="fg-white3 fg-hover-yellow">Logout</a></li>
                </ul>
            </div>
            <div class="place-right no-margin-top profile-image"  >
                <img alt="Profile image" ng-if="vm.user.picture" width="50" height="50" ng-src="{{vm.user.picture}}" class="profile-image"/> 
            </div>
        </div>
    </div>


    <div class="page-content" style="margin-top:25px;">
        <div class="flex-grid no-responsive-future" style="height: 100%;">
            <div class="row" style="height: 100%; border-top: 1px solid rgba( 239,239,239,0.78 );">
                <div class="cell size-x200" id="cell-sidebar" style="background-color: #71b1d1; height: 100%">
                    <ul class="sidebar" ng-controller="MenuController as vm">
                        <li  ng-class="{'active': vm.currentRoute.status==undefined}"><a href="#/tickets">
                            <span class="mif-mail icon"></span>
                            <span class="title">Dashboard</span>
                        </a></li>
                        <li ng-class="{'active': vm.currentRoute.status=='open'}"><a href="#/tickets/status/open">
                            <span class="mif-mail icon"></span>
                            <span class="title">Open tickets</span>
                            <span class="counter">2</span>
                        </a></li>
                        <li ng-class="{'active': vm.currentRoute.status=='closed'}"><a href="#/tickets/status/closed">
                            <span class="mif-mail-read icon"></span>
                            <span class="title">Closed tickets</span>
                            <span class="counter">0</span>
                        </a></li>
                        <li ng-class="{'active': vm.currentRoute.status=='urgent'}"><a href="#/tickets/status/urgent">
                            <span class="mif-drive-eta icon"></span>
                            <span class="title">Urgent</span>
                            <span class="counter">2</span>
                        </a></li>


                    </ul>
                </div>
                <div class="cell auto-size padding20 bg-white" id="cell-content">
                    <div ng-view></div>
                </div>
            </div>
        </div>
    </div>




</body>
</html>
