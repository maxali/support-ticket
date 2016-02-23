// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE in the project root for license information.

/**
 * List Item Plugin
 *
 * Adds basic demonstration functionality to .ms-ListItem components.
 *
 * @param  {jQuery Object}  One or more .ms-ListItem components
 * @return {jQuery Object}  The same components (allows for chaining)
 */
(function ($) {
    $.fn.ListItem = function () {

        /** Go through each panel we've been given. */
        return this.each(function () {

            var $listItem = $(this);

            /** Detect clicks on selectable list items. */
            $listItem.on('click', '.js-toggleSelection', function (event) {
                $(this).parents('.ms-ListItem').toggleClass('is-selected');
            });

        });

    };
})(jQuery);

// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE in the project root for license information.

/**
 * Dropdown Plugin
 * 
 * Given .ms-Dropdown containers with generic <select> elements inside, this plugin hides the original
 * dropdown and creates a new "fake" dropdown that can more easily be styled across browsers.
 * 
 * @param  {jQuery Object}  One or more .ms-Dropdown containers, each with a dropdown (.ms-Dropdown-select)
 * @return {jQuery Object}  The same containers (allows for chaining)
 */
(function ($) {
    $.fn.Dropdown = function () {

        /** Go through each dropdown we've been given. */
        return this.each(function () {

            var $dropdownWrapper = $(this),
                $originalDropdown = $dropdownWrapper.children('.ms-Dropdown-select'),
                $originalDropdownOptions = $originalDropdown.children('option'),
                originalDropdownID = this.id,
                newDropdownTitle = '',
                newDropdownItems = '',
                newDropdownSource = '';

            /** Go through the options to fill up newDropdownTitle and newDropdownItems. */
            $originalDropdownOptions.each(function (index, option) {

                /** If the option is selected, it should be the new dropdown's title. */
                if (option.selected) {
                    newDropdownTitle = option.text;
                }

                /** Add this option to the list of items. */
                newDropdownItems += '<li class="ms-Dropdown-item' + ((option.disabled) ? ' is-disabled"' : '"') + '>' + option.text + '</li>';

            });

            /** Insert the replacement dropdown. */
            newDropdownSource = '<span class="ms-Dropdown-title">' + newDropdownTitle + '</span><ul class="ms-Dropdown-items">' + newDropdownItems + '</ul>';
            $dropdownWrapper.append(newDropdownSource);

            function _openDropdown(evt) {
                if (!$dropdownWrapper.hasClass('is-disabled')) {

                    /** First, let's close any open dropdowns on this page. */
                    $dropdownWrapper.find('.is-open').removeClass('is-open');

                    /** Stop the click event from propagating, which would just close the dropdown immediately. */
                    evt.stopPropagation();

                    /** Before opening, size the items list to match the dropdown. */
                    var dropdownWidth = $(this).parents(".ms-Dropdown").width();
                    $(this).next(".ms-Dropdown-items").css('width', dropdownWidth + 'px');

                    /** Go ahead and open that dropdown. */
                    $dropdownWrapper.toggleClass('is-open');
                    $('.ms-Dropdown').each(function () {
                        if ($(this)[0] !== $dropdownWrapper[0]) {
                            $(this).removeClass('is-open');
                        }
                    });

                    /** Temporarily bind an event to the document that will close this dropdown when clicking anywhere. */
                    $(document).bind("click.dropdown", function (event) {
                        $dropdownWrapper.removeClass('is-open');
                        $(document).unbind('click.dropdown');
                    });
                }
            };

            /** Toggle open/closed state of the dropdown when clicking its title. */
            $dropdownWrapper.on('click', '.ms-Dropdown-title', function (event) {
                _openDropdown(event);
            });

            /** Keyboard accessibility */
            $dropdownWrapper.on('keyup', function (event) {
                var keyCode = event.keyCode || event.which;
                // Open dropdown on enter or arrow up or arrow down and focus on first option
                if (!$(this).hasClass('is-open')) {
                    if (keyCode === 13 || keyCode === 38 || keyCode === 40) {
                        _openDropdown(event);
                        if (!$(this).find('.ms-Dropdown-item').hasClass('is-selected')) {
                            $(this).find('.ms-Dropdown-item:first').addClass('is-selected');
                        }
                    }
                }
                else if ($(this).hasClass('is-open')) {
                    // Up arrow focuses previous option
                    if (keyCode === 38) {
                        if ($(this).find('.ms-Dropdown-item.is-selected').prev().siblings().size() > 0) {
                            $(this).find('.ms-Dropdown-item.is-selected').removeClass('is-selected').prev().addClass('is-selected');
                        }
                    }
                    // Down arrow focuses next option
                    if (keyCode === 40) {
                        if ($(this).find('.ms-Dropdown-item.is-selected').next().siblings().size() > 0) {
                            $(this).find('.ms-Dropdown-item.is-selected').removeClass('is-selected').next().addClass('is-selected');
                        }
                    }
                    // Enter to select item
                    if (keyCode === 13) {
                        if (!$dropdownWrapper.hasClass('is-disabled')) {

                            // Item text
                            var selectedItemText = $(this).find('.ms-Dropdown-item.is-selected').text()

                            $(this).find('.ms-Dropdown-title').html(selectedItemText);

                            /** Update the original dropdown. */
                            $originalDropdown.find("option").each(function (key, value) {
                                if (value.text === selectedItemText) {
                                    $(this).prop('selected', true);
                                } else {
                                    $(this).prop('selected', false);
                                }
                            });
                            $originalDropdown.change();

                            $(this).removeClass('is-open');
                        }
                    }
                }

                // Close dropdown on esc
                if (keyCode === 27) {
                    $(this).removeClass('is-open');
                }
            });

            /** Select an option from the dropdown. */
            $dropdownWrapper.on('click', '.ms-Dropdown-item', function () {
                if (!$dropdownWrapper.hasClass('is-disabled')) {

                    /** Deselect all items and select this one. */
                    $(this).siblings('.ms-Dropdown-item').removeClass('is-selected')
                    $(this).addClass('is-selected');

                    /** Update the replacement dropdown's title. */
                    $(this).parents().siblings('.ms-Dropdown-title').html($(this).text());

                    /** Update the original dropdown. */
                    var selectedItemText = $(this).text();
                    $originalDropdown.find("option").each(function (key, value) {
                        if (value.text === selectedItemText) {
                            $(this).prop('selected', true);
                        } else {
                            $(this).prop('selected', false);
                        }
                    });
                    $originalDropdown.change();
                }
            });

        });
    };
})(jQuery);

// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE in the project root for license information.

/**
 * Text Field Plugin
 *
 * Adds basic demonstration functionality to .ms-TextField components.
 *
 * @param  {jQuery Object}  One or more .ms-TextField components
 * @return {jQuery Object}  The same components (allows for chaining)
 */
(function ($) {
    $.fn.TextField = function () {

        /** Iterate through each text field provided. */
        return this.each(function () {

            /** Does it have a placeholder? */
            if ($(this).hasClass("ms-TextField--placeholder")) {

                /** Hide the label on click. */
                $(this).on('click', function () {
                    $(this).find('.ms-Label').hide();
                });

                /** Show the label again when leaving the field. */
                $(this).find('.ms-TextField-field').on('blur', function () {

                    /** Only do this if no text was entered. */
                    if ($(this).val().length === 0) {
                        $(this).siblings('.ms-Label').show();
                    }
                });
            };

            /** Underlined - adding/removing a focus class */
            if ($(this).hasClass('ms-TextField--underlined')) {

                /** Add is-active class - changes border color to theme primary */
                $(this).find('.ms-TextField-field').on('focus', function () {
                    $(this).parent('.ms-TextField--underlined').addClass('is-active');
                });

                /** Remove is-active on blur of textfield */
                $(this).find('.ms-TextField-field').on('blur', function () {
                    $(this).parent('.ms-TextField--underlined').removeClass('is-active');
                });
            };

        });
    };
})(jQuery);

// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE in the project root for license information.

/**
 * Panel Plugin
 *
 * Adds basic demonstration functionality to .ms-Panel components.
 *
 * @param  {jQuery Object}  One or more .ms-Panel components
 * @return {jQuery Object}  The same components (allows for chaining)
 */
(function ($) {
    $.fn.Panel = function () {

        /** Go through each panel we've been given. */
        return this.each(function () {

            var $panel = $(this);
            var $panelMain = $panel.find(".ms-Panel-main");

            /** Hook to open the panel. */
            $(".js-togglePanel").on("click", function () {
                // Panel must be set to display "block" in order for animations to render
                $panelMain.css({ display: "block" });
                $panel.toggleClass("is-open");
            });

            $panelMain.on("animationend webkitAnimationEnd MSAnimationEnd", function (event) {
                if (event.originalEvent.animationName === "fadeOut") {
                    // Hide and Prevent ms-Panel-main from being interactive
                    $(this).css({ display: "none" });
                }
            });

        });

    };
})(jQuery);

// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE in the project root for license information.

/**
 * People Picker Plugin
 *
 * Adds basic demonstration functionality to .ms-PeoplePicker components.
 * 
 * @param  {jQuery Object}  One or more .ms-PeoplePicker components
 * @return {jQuery Object}  The same components (allows for chaining)
 */
(function ($) {
    $.fn.PeoplePicker = function () {

        /** Iterate through each people picker provided. */
        return this.each(function () {

            var $peoplePicker = $(this);
            var $searchField = $peoplePicker.find(".ms-PeoplePicker-searchField");
            var $results = $peoplePicker.find(".ms-PeoplePicker-results");
            var $searchMore = $peoplePicker.find(".ms-PeoplePicker-searchMore");
            var $selected = $peoplePicker.find('.ms-PeoplePicker-selected');
            var $selectedPeople = $peoplePicker.find(".ms-PeoplePicker-selectedPeople")
            var $selectedCount = $peoplePicker.find(".ms-PeoplePicker-selectedCount")
            var isActive = false;
            var spinner;

            // Run when focused or clicked
            function peoplePickerActive(event) {
                /** Scroll the view so that the people picker is at the top. */
                $('html, body').animate({
                    scrollTop: $peoplePicker.offset().top
                }, 367);

                /** Start by closing any open people pickers. */
                if ($('.ms-PeoplePicker').hasClass('is-active')) {
                    $(".ms-PeoplePicker").removeClass("is-active");
                }

                isActive = true;

                /** Stop the click event from propagating, which would just close the dropdown immediately. */
                event.stopPropagation();

                /** Before opening, size the results panel to match the people picker. */
                $results.width($peoplePicker.width() - 2);

                /** Show the $results by setting the people picker to active. */
                $peoplePicker.addClass("is-active");

                /** Temporarily bind an event to the document that will close the people picker when clicking anywhere. */
                $(document).bind("click.peoplepicker", function (event) {
                    $peoplePicker.removeClass('is-active');
                    $(document).unbind('click.peoplepicker');
                    isActive = false;
                });
            };

            /** Set to active when focusing on the input. */
            $peoplePicker.on('focus', '.ms-PeoplePicker-searchField', function (event) {
                peoplePickerActive(event);
            });

            /** Set to active when clicking on the input. */
            $peoplePicker.on('click', '.ms-PeoplePicker-searchField', function (event) {
                peoplePickerActive(event);
            });

            /** Keep the people picker active when clicking within it. */
            $(this).click(function (event) {
                event.stopPropagation();
            });

            /** Add the selected person to the text field or selected list and close the people picker. */
            $results.on('click', '.ms-PeoplePicker-result', function (event) {
                var selectedName = $(this).find(".ms-Persona-primaryText").html();
                var selectedTitle = $(this).find(".ms-Persona-secondaryText").html();
                var dataKey = $(this).find(".ms-Persona-dataKey").val();
                var selectedImage = $(this).find(".ms-Persona-image").attr('src');
                var personaHTML = '<div class="ms-PeoplePicker-persona">' +
                      '<div class="ms-Persona ms-Persona--xs ms-Persona--square">' +
                                         '<div class="ms-Persona-imageArea">' +
                                           '<i class="ms-Persona-placeholder ms-Icon ms-Icon--person"></i>' +
                                           '<img class="ms-Persona-image" src="'+selectedImage+'">' +
                                         '</div>' +
                                         '<div class="ms-Persona-presence"></div>' +
                                         '<div class="ms-Persona-details">' +
                                           '<div class="ms-Persona-primaryText">' + selectedName + '</div>' +
                                        ' </div>' +
                                       '</div>' +
                                       '<button class="ms-PeoplePicker-personaRemove">' +
                                         '<i class="ms-Icon ms-Icon--x"></i>' +
                                      ' </button>' +
                                     '</div>';
                var personaListItem = '<li class="ms-PeoplePicker-selectedPerson">' +
                        '<div class="ms-Persona ms-Persona--square">' +
                               '<div class="ms-Persona-imageArea">' +
                                 '<i class="ms-Persona-placeholder ms-Icon ms-Icon--person"></i>' +
                                  '<img class="ms-Persona-image" src="' + selectedImage + '"><div class="ms-Persona-presence"></div>' +
                               '</div>' +
                               '<div class="ms-Persona-details">' +
                                  '<div class="ms-Persona-primaryText">' + selectedName + '</div>' +
                                  '<div class="ms-Persona-secondaryText">' + selectedTitle + '</div>' +
                                '</div>' +
                              '</div>' +
                              '<button class="ms-PeoplePicker-resultAction js-selectedRemove"><i class="ms-Icon ms-Icon--x"></i></button>' +
                          '</li>';
                if ($peoplePicker.find('.ms-PeoplePicker-persona').length > 0 && $peoplePicker.hasClass('single'))
                		return false;
                if (!$peoplePicker.hasClass('ms-PeoplePicker--facePile')) {
                		$searchField.before(personaHTML);
                		$searchField.val(selectedTitle);
                    $peoplePicker.removeClass("is-active");
                    resizeSearchField($peoplePicker);
                    $searchField.siblings(".selectedKey").val(dataKey).trigger('input');

                    $('.ms-PeoplePicker-searchField').val("");
                }
                else {
                    if (!$selected.hasClass('is-active')) {
                        $selected.addClass('is-active');
                    }
                    $selectedPeople.prepend(personaListItem);
                    $peoplePicker.removeClass("is-active");
                    var count = $peoplePicker.find('.ms-PeoplePicker-selectedPerson').length;
                    $selectedCount.html(count);
                }
            });

            /** Remove the persona when clicking the personaRemove button. */
            $peoplePicker.on('click', '.ms-PeoplePicker-personaRemove', function (event) {
							// Remove value from Hidden Key Input (for Angular)
            	$(this).parents('.ms-PeoplePicker-persona').siblings(".selectedKey").val("").trigger("input");
            	$(this).parents('.ms-PeoplePicker-persona').remove();
                
                /** Make the search field 100% width if all personas have been removed */
                if ($('.ms-PeoplePicker-persona').length == 0) {
                    $peoplePicker.find('.ms-PeoplePicker-searchField').outerWidth('100%');
                } else {
                    resizeSearchField($peoplePicker);
                }
            });

            /** Trigger additional searching when clicking the search more area. */
            $results.on('click', '.js-searchMore', function (event) {
                var $searchMore = $(this);
                var primaryLabel = $searchMore.find(".ms-PeoplePicker-searchMorePrimary");
                var originalPrimaryLabelText = primaryLabel.html();

                /** Change to searching state. */
                $searchMore.addClass("is-searching");
                primaryLabel.html("Searching for &ldquo;Sen&rdquo;");

                /** Attach Spinner */
                if (!spinner) {
                    spinner = new fabric.Spinner($searchMore.get(0));
                } else {
                    spinner.start();
                }

                /** Return the original state. */
                setTimeout(function () {
                    $searchMore.removeClass("is-searching");
                    primaryLabel.html(originalPrimaryLabelText);
                    spinner.stop();
                }, 3000);
            });

            /** Remove a result using the action icon. */
            $results.on('click', '.js-resultRemove', function (event) {
                event.stopPropagation();
                $(this).parent(".ms-PeoplePicker-result").remove();
            });

            /** Expand a result if more details are available. */
            $results.on('click', '.js-resultExpand', function (event) {
                event.stopPropagation();
                $(this).parent(".ms-PeoplePicker-result").toggleClass("is-expanded");
            });

            /** Remove a selected person using the action icon. */
            $selectedPeople.on('click', '.js-selectedRemove', function (event) {
                event.stopPropagation();
                $(this).parent(".ms-PeoplePicker-selectedPerson").remove();
                var count = $peoplePicker.find('.ms-PeoplePicker-selectedPerson').length;
                $selectedCount.html(count);
                if ($peoplePicker.find('.ms-PeoplePicker-selectedPerson').length === 0) {
                    $selected.removeClass('is-active');
                }
            });

        });
    };

    function resizeSearchField($peoplePicker) {

        var $searchBox = $peoplePicker.find('.ms-PeoplePicker-searchBox');

        // Where is the right edge of the search box?
        var searchBoxLeftEdge = $searchBox.position().left;
        var searchBoxWidth = $searchBox.outerWidth();
        var searchBoxRightEdge = searchBoxLeftEdge + searchBoxWidth;

        // Where is the right edge of the last persona component?
        var $lastPersona = $searchBox.find('.ms-PeoplePicker-persona:last');
        var lastPersonaLeftEdge = $lastPersona.offset().left;
        var lastPersonaWidth = $lastPersona.outerWidth();
        var lastPersonaRightEdge = lastPersonaLeftEdge + lastPersonaWidth;

        // Adjust the width of the field to fit the remaining space.
        var newFieldWidth = searchBoxRightEdge - lastPersonaRightEdge - 7;

        // Don't let the field get too tiny.
        if (newFieldWidth < 100) {
            newFieldWidth = "100%";
        }

        $peoplePicker.find('.ms-PeoplePicker-searchField').outerWidth(newFieldWidth);
    }

})(jQuery);
