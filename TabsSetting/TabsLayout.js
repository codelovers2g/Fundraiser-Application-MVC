
//Global variables
var viewUrl = "";
var locationId = "";
var tempTabNavBarContextClick = "";

//creating object 
var TabsLayout = {
    init: function () {

        //Right Click tabs functionality
        var $contextMenu = $("#tabcontextMenu");
        var $contextMenuItems = $("#tabcontextMenu ul li a");
        $("body").on("contextmenu", "#tabsNavbar li", function (e) {
           
            if ($("#tabsNavbar li").length == 1) {               
                $contextMenu.css({
                    display: "block",
                    left: e.pageX,
                    top: e.pageY - 45
                });

                $contextMenuItems.css({

                    cursor: "not-allowed"

                });
                tempTabNavBarContextClick = $(this);
            }
            else {
                $contextMenu.css({
                    display: "block",
                    left: e.pageX,
                    top: e.pageY - 45
                });
                $contextMenuItems.css({

                    cursor: "pointer"

                });
                tempTabNavBarContextClick = $(this);
            }


            return false;

        });

        $('html').click(function () {
            $contextMenu.hide();
        });


        //close tab
        $("#tabcontextMenu li #closeTabsLink").click(function (e) {

            var tabid = tempTabNavBarContextClick.children("a:first").attr("id");
            TabsLayout.removeTab(tabid);
            $contextMenu.hide();
        });

        //close all tab function hit
        $("#tabcontextMenu li #closeOtherTabsLink").click(function (e) {

            var tabid = tempTabNavBarContextClick.children("a:first").attr("id");
            var tabindex = $("#" + tabid).parent("li").index();

            var tabsElementsLenght = $("#tabsNavbar li").length;
            var selectorTabElement = $("#tabsNavbar li");

            for (var i = 0; i < tabsElementsLenght; i++) {


                if (i == tabindex) {


                }
                else {

                    //check atleast one tab is open
                    if ($("#tabsNavbar li").length == 1) {
                        return;
                    }

                    var tempVal = selectorTabElement.eq(i);

                    tabid = tempVal.children("a:first").attr("id");

                    // remove tab and related tabContent
                    var tabContentname = tabid + "_tabContent";
                    $("#" + tabContentname).remove();
                    $("#" + tabid).parent().remove();


                }

            }

            // if there is no current tab and if there are still tabsNavbar left, show the first one
            if ($("#tabsNavbar li.current").length == 0 && $("#tabsNavbar li").length > 0) {

                // find the first tab
                var firsttab = $("#tabsNavbar li:first-child");
                firsttab.addClass("current");

                // get its link name and show related tabContent
                var firsttabid = $(firsttab).find("a.tab").attr("id");
                $("#" + firsttabid + "_tabContent").show();


                //load view
                locationId = $('#' + firsttabid).attr("id") + "_tabContent";
                viewUrl = $('#' + firsttabid).attr("data-src");

                if ($("#" + locationId).html() == "") {
                    //call the load view function
                    TabsLayout.loadViewsToTabs(viewUrl);
                }

                //change url
                TabsLayout.ChangeUrl(firsttabid, $("#" + firsttabid).attr("data-url"));

                //save current.
                //TabsLayout.setActiveTab(firsttabid);
                TabsLayout.createTabsObject();

            }

            //Remove from databse call
            TabsLayout.createTabsObject();

            //hide context menu
            $contextMenu.hide();


        });


        //close all tab to right    
        $("#tabcontextMenu li #closeTabsToRightLink").click(function (e) {

            var tabid = tempTabNavBarContextClick.children("a:first").attr("id");
            var tabindex = $("#" + tabid).parent("li").index();

            var tabsElementsLenght = $("#tabsNavbar li").length;
            var selectorTabElement = $("#tabsNavbar li");

            for (var i = tabindex; i < tabsElementsLenght; i++) {


                if (i == tabindex) {


                }
                else {

                    //check atleast one tab is open
                    if ($("#tabsNavbar li").length == 1) {
                        return;
                    }

                    var tempVal = selectorTabElement.eq(i);

                    tabid = tempVal.children("a:first").attr("id");

                    // remove tab and related tabContent
                    var tabContentname = tabid + "_tabContent";
                    $("#" + tabContentname).remove();
                    $("#" + tabid).parent().remove();


                }

            }

            // if there is no current tab and if there are still tabsNavbar left, show the first one
            if ($("#tabsNavbar li.current").length == 0 && $("#tabsNavbar li").length > 0) {

                // find the first tab
                var firsttab = $("#tabsNavbar li:first-child");
                firsttab.addClass("current");

                // get its link name and show related tabContent
                var firsttabid = $(firsttab).find("a.tab").attr("id");
                $("#" + firsttabid + "_tabContent").show();


                //load view
                locationId = $('#' + firsttabid).attr("id") + "_tabContent";
                viewUrl = $('#' + firsttabid).attr("data-src");

                if ($("#" + locationId).html() == "") {
                    //call the load view function
                    TabsLayout.loadViewsToTabs(viewUrl);
                }

                //change url
                TabsLayout.ChangeUrl(firsttabid, $("#" + firsttabid).attr("data-url"));

                //save current.
                // TabsLayout.setActiveTab(firsttabid);
                TabsLayout.createTabsObject();

            }

            //Remove from databse call
            TabsLayout.createTabsObject();

            //hide context menu
            $contextMenu.hide();


        });

        //Right Click tabs functionality end here



        // for Drag tab functionality
        $("#tabsNavbar").sortable({
            update: function (event, ui) {
                TabsLayout.createTabsObject();
            }
        });



        //tab click function
        $(".navbarList a").click(function () {

            var wholeLink = $(this);

            TabsLayout.ChangeUrl($(this).attr('rel'), $(this).attr('data-url'));


            if ($(this).is("[data-category='true']")) {

                TabsLayout.setRefrenceIdToStorageForCategory($(this).attr('rel'));

            }
            TabsLayout.addTab(wholeLink);
        });       

        $("#male-edit,#female-edit").click(function () {
            debugger;
            var wholeLink = $(this).clone();
            wholeLink.html("<span class='spanText'><i class='fa fa-user'></i>&nbsp;&nbsp;Person's Info</span>");
            TabsLayout.ChangeUrl($(this).attr('rel'), $(this).attr('data-url'));
            TabsLayout.addTab(wholeLink);
            //Sort tabs according to currently selected tab
            //$('#tabsNavbar li').html(function () {
            //    var result = $('#tabsNavbar li').sort((a, b) => $(b).hasClass('current') ? 1 : -1);
            //    $('#tabsNavbar').append(result);
            //});
        });

        //$("#male-edit,#female-edit").click(function () {
        //    //$(".modal").removeClass('modalBgColor');
        //    //PersonCompleteDetails.addPeople(peopleEditUrlMale);
        //});

        //active tab
        $('#tabsNavbar').on('click', 'a.tab', function () {

            //if ($(".navbarList a[rel=" + $(this).attr("id") + "]").is("[data-category='true']")) {

            //    
            //    Account.setSessionTabReferenceId($(this).attr('id') + "_tabContent");
            //    TabsLayout.setRefrenceIdToStorageForCategory($(this).attr('id'));


            //}  
            TabsLayout.setRefrenceIdToStorageForCategory($(this).attr('id'));
            TabsLayout.activeTab($(this).attr("id"));


        });
        //remove tab
        $('#tabsNavbar').on('click', 'a.remove', function () {
            console.log($(this).parent().parent().children("a:first").attr("id"));
            TabsLayout.removeTab($(this).parent().parent().children("a:first").attr("id"));

        });
        //tab reload function
        $('#tabsNavbar').on('click', 'a.reload', function () {

            if ($(".navbarList a[rel=" + $(this).parent().children("a:first").attr("id") + "]").is("[data-category='true']")) {


                TabsLayout.setRefrenceIdToStorageForCategory($(this).parent().children("a:first").attr("id"));

            }

            TabsLayout.refreshTab($(this).parent().children("a:first").attr("id"));

        });
        // load tabs 
        //TabsLayout.loadAllTabsToBrowser();
        loadertab.hideloadertab();

    },
    UpdateTheSelectedPerson: function (pid) {
        //alert("updated the selected person id");
        //find if the is a tab with person details
        if ($("#tabsNavbar li a[data-type='person']") != undefined && $("#tabsNavbar li a[data-type='person']").length > 0) {
            $("#tabsNavbar li a[data-type='person']").each(function () {
                // set the updated data-src link with new person id
                //console.log($(this));
                //$(this).attr('data-src','/people/AddEditPeople/'+pid)
            })
        }
    },
    addPersonTab: function (link) {

        var id = 'PersonView';
        var rel = 'personview';
        //var rel = 'personview';
        //var src = '/People/PersonDetails';
        var url = '/People/PersonDetails';
        //var url = "PersonView";

        // If tab already exist in the list, return
        TabsLayout.ChangeUrl(rel, url);
        if ($("#" + rel).length != 0) {
            //activate tab if already present
            $('#tabsNavbar li a[id=' + rel + ']').click();
            return;
        }

        // close any other previous edit person tab
        //if ($("#tabsNavbar li a[data-type='person']") != undefined && $("#tabsNavbar li a[data-type='person']").length > 0) {
        //    $("#tabsNavbar li a[data-type='person']").each(function () {
        //        console.log($(this).attr('data-url'));
        //        //console.log(link);
        //        if ($(this).attr('data-url') != link) {
        //            //close this tab
        //            $(this).next().click();
        //        }
        //    })
        //}

        //if ($('#tabsNavbar li a[id=' + rel + ']') != undefined && $('#tabsNavbar li a[id=' + rel + ']').length > 0) {
        //    $('#tabsNavbar li a[id=' + rel + ']').click();
        //    return;
        //}

        loadertab.showloadertab();
        // hide other tabsNavbar
        $("#tabsNavbar li").removeClass("current");
        $("#tabContent > div").hide();

        // add new tab and related tabContent

        $("#tabsNavbar").append("<li class='current ui-state-default'><a class='tab' id='" + rel
            + "' href='javascript:void(0)' data-type='person' data-url='" + url + "' data-src='" + url + "' data-onetimetab='" + rel + "' >" + "<i class='fa fa-user'></i>&nbsp;&nbsp;Person's Info" +
            "</a><div class='reloadremovebtn'><a href='javascript:void(0)' class='remove'><i class='fa fa-times' aria-hidden='true'></i></a><a href='javascript:void(0)' data-onetimetab='" + rel + "' data-src='" + url + "' class='reload'><i class='fa fa-refresh' aria-hidden='true'></i></a></div></li>");

        $("#tabContent").append("<div id='" + rel + "_tabContent'></div>");

        $("#" + rel + "_tabContent").show();
        locationId = rel + "_tabContent";

        //call the view to load
        TabsLayout.loadViewsToTabs(url);
        TabsLayout.createTabsObject();

        loadertab.hideloadertab();
    },
    addTab: function (link) {
        // If tab already exist in the list, return
        if ($("#" + $(link).attr("rel")).length != 0) {
            //activate tab if already present
            $('#tabsNavbar li a[id=' + $(link).attr("rel") + ']').click();
            return;
        }
        loadertab.showloadertab();
        // hide other tabsNavbar
        $("#tabsNavbar li").removeClass("current");
        $("#tabContent > div").hide();

        // add new tab and related tabContent
        $("#tabsNavbar").append("<li class='current ui-state-default'><a class='tab' id='" +
            $(link).attr("rel") + "' href='javascript:void(0)' data-url='" + $(link).attr("data-url") + "' data-src='" + $(link).attr("data-src") + "' data-onetimetab='" + $(link).attr("data-onetimetab") + "' >" + $(link).html() +
            "</a><div class='reloadremovebtn'><a href='javascript:void(0)' class='remove'><i class='fa fa-times' aria-hidden='true'></i></a><a href='javascript:void(0)' data-onetimetab='" + $(link).attr("data-onetimetab") + "' data-src='" + $(link).attr("data-src") + "' class='reload'><i class='fa fa-refresh' aria-hidden='true'></i></a></div></li>");

        $("#tabContent").append("<div id='" + $(link).attr("rel") + "_tabContent'></div>");

        // set the newly added tab as current
        $("#" + $(link).attr("rel") + "_tabContent").show();


        viewUrl = $(link).attr("data-src");
        locationId = $(link).attr("rel") + "_tabContent";
        //call the view to load

        TabsLayout.loadViewsToTabs(viewUrl);

        TabsLayout.createTabsObject();

        loadertab.hideloadertab();

        //TabsLayout.setActiveTab($(link).attr("rel"));


    },

    activeTab: function (tabId) {
        debugger;
        // console.log('active tab');
        TabsLayout.ChangeUrl($("#" + tabId).attr("id"), $("#" + tabId).attr("data-url"));

        // Get the tab name
        var tabContentname = tabId + "_tabContent";
        //console.log(tabContentname);
        //console.log('#' + tabContentname + ' .dataTables_filter input');


        // hide all other tabsNavbar
        $("#tabContent > div").hide();
        $("#tabsNavbar li").removeClass("current");

        // show current tab
        $("#" + tabContentname).show();
        $("#" + tabId).parent().addClass("current");
         //Sort tabs according to currently selected tab
        //$('#tabsNavbar li').html(function () {
        //    var result = $('#tabsNavbar li').sort((a, b) => $(b).hasClass('current') ? 1 : -1);
        //    $('#tabsNavbar').append(result);
        //});


        // setting focus in the input box
        $(`#${tabContentname} .dataTables_filter input`).focus();

        //if div is null it load its view
        if ($('#' + tabContentname).html().length == 0) {

            loadertab.showloadertab();

            //load view 
            locationId = tabId + "_tabContent";
            viewUrl = $("#" + tabId).attr("data-src");


            //call the load view function
            TabsLayout.loadViewsToTabs(viewUrl);


        }

        if ($(".navbarList a[rel=" + tabId + "]").is("[data-category='true']")) {


            //Account.setSessionTabReferenceId(tabId + "_tabContent");
            TabsLayout.setRefrenceIdToStorageForCategory(tabId);
            //console.log(Account);
            if (Account != undefined)
                Account.setSessionTabReferenceId();
            cardknoxAccount.GetCardknoxKeyByCategory(tabId + "_tabContent");

        }


        //save current tab

        TabsLayout.createTabsObject();
        // loadertab.hideloadertab();
    },

    removeTab: function (tabId) {

        //check atleast one tab is open
        if ($("#tabsNavbar li").length == 1) {
            return;
        }

        // Get the tab name            
        var tabid = tabId;

        // remove tab and related tabContent
        var tabContentname = tabid + "_tabContent";
        $("#" + tabContentname).remove();
        $("#" + tabid).parent().remove();

        // if there is no current tab and if there are still tabsNavbar left, show the first one
        if ($("#tabsNavbar li.current").length == 0 && $("#tabsNavbar li").length > 0) {

            // find the first tab
            var firsttab = $("#tabsNavbar li:first-child");
            firsttab.addClass("current");

            // get its link name and show related tabContent
            var firsttabid = $(firsttab).find("a.tab").attr("id");
            $("#" + firsttabid + "_tabContent").show();


            //load view
            locationId = $('#' + firsttabid).attr("id") + "_tabContent";
            viewUrl = $('#' + firsttabid).attr("data-src");

            if ($("#" + locationId).html() == "") {

                TabsLayout.setRefrenceIdToStorageForCategory(firsttabid);

                //call the load view function
                TabsLayout.loadViewsToTabs(viewUrl);
            }

            //change url
            TabsLayout.ChangeUrl(firsttabid, $("#" + firsttabid).attr("data-url"));

            //save current.
            //TabsLayout.setActiveTab(firsttabid);

            if ($(".navbarList a[rel=" + firsttabid + "]").is("[data-category='true']")) {
                //set session value
                TabsLayout.setRefrenceIdToStorageForCategory(firsttabid);

                //refresh Reference id
                if (Account != undefined)
                    Account.setSessionTabReferenceId();

            }


        }

        //Remove from databse call
        TabsLayout.createTabsObject();


    },

    refreshTab: function (tabId) {

        loadertab.showloadertab();

        //get current tab url and location
        locationId = $("#" + tabId).parent("li").children("a:first").attr("id") + "_tabContent";
        viewUrl = $("#" + tabId).attr("data-src");

        TabsLayout.loadViewsToTabs(viewUrl);


    },

    loadViewsToTabs: function (url) {

        ajaxrepository.callServiceForHtml(url, '', TabsLayout.loadViewsToTabsSuccess, TabsLayout.OnError, undefined);
    },
    loadAllTabsToBrowser: function () {
        ajaxrepository.callService("/Home/LoadTabSettings", '', TabsLayout.loadTabsSuccess, TabsLayout.OnError, undefined);
    },
    loadTabsSuccess: function (d, s, e) {
        debugger;
        if (s == "success") {

            $("#tabsNavbar").html("");
            $("#tabContent").html("");


            if (d.length > 0) {

                var data = JSON.parse(d[0]["Settings"]);
                var currentActiveTab = d[0]["ActiveTab"];
                //console.log("----")
                //console.log(data);
                //console.log("----")
                //console.log(currentActiveTab);

                //console.log("Tab Settings")
                //console.log(data);
                //console.log("Tab Settings ends here")

                var keysLenght = Object.keys(data).length;
                var tempCount = 1;
                //alert('dd');

                $.each(data, function (key, value) {


                    if (tempCount == keysLenght) {

                        // hide other tabsNavbar
                        $("#tabsNavbar li").removeClass("current");
                        $("#tabContent > div").hide();

                        // add new tab and related tabContent
                        $("#tabsNavbar").append("<li class='current'><a class='tab mr-3' id='" +
                            key + "' href='javascript:void(0)' data-src='" + value + "' data-url='" + $(".navbarList a[rel=" + key + "]").attr("data-url") + "' data-onetimetab='" + $(".navbarList a[rel=" + key + "]").attr("data-onetimetab") + "'  >" + $(".navbarList a[rel=" + key + "]").html() +
                            "</a><div class='reloadremovebtn'><a href='javascript:void(0)' class='remove'><i class='fa fa-times' aria-hidden='true'></i></a><a href='javascript:void(0)'  data-onetimetab='" + $(".navbarList a[rel=" + key + "]").attr("data-onetimetab") + "'  data-src='" + value + "' class='reload'><i class='fa fa-refresh' aria-hidden='true'></i></a></div></li>");

                        $("#tabContent").append("<div id='" + key + "_tabContent'></div>");                     

                        // hide other tabsNavbar
                        $("#tabsNavbar li").removeClass("current");
                        $("#tabContent > div").hide();

                        var activeTabUrl = decodeURIComponent($("#hdnCurrentActiveTab").val());

                        if ($("#hdnCurrentActiveTab").val() != "") {
                            var TabId = $(".navbarList a[data-url='" + activeTabUrl + "']").attr("rel");
                            var Tabsrc = $(".navbarList a[data-url='" + activeTabUrl + "']").attr("data-src");

                            if ($("#hdnCurrentActiveTab").val() != "/home/index") {

                                if ($("#tabsNavbar li a[id=" + TabId + "]").length == 0) {

                                    $(".navbarList a[rel=" + TabId + "]").click();

                                }
                                else {

                                    TabsLayout.setRefrenceIdToStorageForCategory(TabId);

                                    TabsLayout.ChangeUrl(TabId, activeTabUrl);

                                    // Get the tab name
                                    var tabContentname = TabId + "_tabContent";

                                    // hide all other tabsNavbar
                                    $("#tabContent > div").hide();
                                    $("#tabsNavbar li").removeClass("current");

                                    // show current tab
                                    $("#" + tabContentname).show();
                                    $("#tabsNavbar li a[id=" + TabId + "]").parent().addClass("current");
                                   //Sort tabs according to currently selected tab
                                    //$('#tabsNavbar li').html(function () {
                                    //    var result = $('#tabsNavbar li').sort((a, b) => $(b).hasClass('current') ? 1 : -1);
                                    //    $('#tabsNavbar').append(result);
                                    //});

                                    //if div is null it load its view
                                    if ($('#' + tabContentname).html().length == 0) {

                                        //load view 
                                        locationId = TabId + "_tabContent";
                                        viewUrl = $("#" + TabId).attr("data-src");

                                        //call the load view function
                                        TabsLayout.loadViewsToTabs(viewUrl);

                                    }

                                    //save current tab
                                    // TabsLayout.setActiveTab(TabId);
                                    TabsLayout.createTabsObject();
                                }
                            }

                            else {                          
                                //set current tab active

                                $("#tabsNavbar li a[id=" + currentActiveTab + "]").parent().addClass("current");

                                // set the newly added tab as current
                                $("#" + currentActiveTab + "_tabContent").show();

                                viewUrl = $("#tabsNavbar li a[id=" + currentActiveTab + "]").attr("data-src");
                                locationId = currentActiveTab + "_tabContent";
                                //call the view to load

                                TabsLayout.setRefrenceIdToStorageForCategory(currentActiveTab);

                                TabsLayout.loadViewsToTabs(viewUrl);

                                //set url
                                TabsLayout.ChangeUrl(currentActiveTab, $(".navbarList a[rel=" + currentActiveTab + "]").attr("data-url"));




                            }
                            // TabsLayout.ChangeUrl($("#hdnCurrentActiveTab").val(), "/" + $("#hdnCurrentActiveTab").val());
                            //save current tab
                        }


                    }
                    else {
                        // hide other tabsNavbar
                        $("#tabsNavbar li").removeClass("current");
                        $("#tabContent > div").hide();

                        // add new tab and related tabContent
                        $("#tabsNavbar").append("<li class='current'><a class='tab' id='" +
                            key + "' href='javascript:void(0)' data-src='" + value + "' data-url='" + $(".navbarList a[rel=" + key + "]").attr("data-url") + "' data-onetimetab='" + $(".navbarList a[rel=" + key + "]").attr("data-onetimetab") + "'  >" + $(".navbarList a[rel=" + key + "]").html() +
                            "</a><div class='reloadremovebtn'><a href='javascript:void(0)' class='remove'><i class='fa fa-times' aria-hidden='true'></i></a><a href='javascript:void(0)'  data-onetimetab='" + $(".navbarList a[rel=" + key + "]").attr("data-onetimetab") + "'  data-src='" + value + "' class='reload'><i class='fa fa-refresh' aria-hidden='true'></i></a></div></li>");

                        $("#tabContent").append("<div id='" + key + "_tabContent'></div>");

                        // set the newly added tab as current
                        $("#" + key + "_tabContent").show();

                        viewUrl = value;
                        locationId = key + "_tabContent";
                        //call the view to load

                    }

                    tempCount = tempCount + 1;

                });


            }
            else {
                //loadertab.hideloadertab();
            }


        }
        else {
            TabsLayout.OnError();
        }
        loadertab.hideloadertab();

    },
    loadViewsToTabsSuccess: function (d, s, e) {
        if (s == "success") {
            $('#' + locationId).html(d);
        }
        else {
            TabsLayout.OnError();
        }
        loadertab.hideloadertab();
    },
    createTabsObject: function () {
        var objtabsettingVm = {};
        var subObj = {};

        var currentActiveTab = $("#tabsNavbar li.current").children("a:first").attr("id");

        $("#tabsNavbar li").each(function () {

            subObj["" + $(this).children("a:first").attr("id") + ""] = $(this).children("a:first").attr("data-src");
        });

        //console.log(subObj);

        objtabsettingVm["Settings"] = JSON.stringify(subObj);
        objtabsettingVm["ActiveTab"] = currentActiveTab;
        TabsLayout.sendRequestToSaveTabs(objtabsettingVm);

    },
    sendRequestToSaveTabs: function (tabsData) {

        var data = "{objtabsettingVm:" + JSON.stringify(tabsData) + "}";
        ajaxrepository.callServiceWithPost("/Home/SaveTabSettings", data, TabsLayout.sendRequestToSaveTabsSuccess, TabsLayout.OnError, undefined);

    },
    sendRequestToSaveTabsSuccess: function (d, s, e) {


        // loader.hideloader();
        if (s == "success") {




        }
        else {
            TabsLayout.OnError();
        }

    },
    ErroMessageReset: function () {
        //  $("#txtName-error").html("");
        // $("#txtHebrewName-error").html("");
        //$("#SolicitorErrorMsz").html("");

    },
    OnError: function () {
        loader.hideloader();
        loadertab.hideloadertab();
        notifiy.notification('danger', "Something went wrong", 'danger');
    },
    ChangeUrl: function (page, url) {
        if (typeof (history.pushState) != "undefined") {
            var obj = { Page: page, Url: url.toString().replace(/\s/g, '') };
            history.pushState(obj, obj.Page, obj.Url);
        }
        else {
            alert("Browser does not support HTML5.");
        }
    },
    setActiveTab: function (link) {

        sessionStorage.setItem("currentActiveTab", link);

    },
    getActiveTab: function () {

        //sessionStorage.setItem("currentActiveTab", link);
        if (sessionStorage['currentActiveTab'] != "") {
            return sessionStorage['currentActiveTab'];
        }
        else {

            return "undefined";
        }
    },

    setRefrenceIdToStorageForCategory: function (referenceId) {
        sessionStorage.setItem("tabReferenceIdForCategory", referenceId + "_tabContent");
    }


}

$(document).ready(function () {
    TabsLayout.init();
}); 
