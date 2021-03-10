
/*eslint-disable */
$(document).ready(function () {

    var toggleMenu = localStorage.getItem('main_menu') ? localStorage.getItem('main_menu') : 'open';


    if ($(document).width() < 1200) {
        $(".main-menu").addClass("is-toggled");
    } else {
        if(toggleMenu == 'close'){
            console.log(toggleMenu == 'close');
            $(".main-menu").addClass("is-toggled");
        }else if(toggleMenu == 'open'){
            $(".main-menu").removeClass("is-toggled");
        }
    }
    $(window).resize(function (e) {
        if ($(document).width() < 1200) {
            $(".main-menu").addClass("is-toggled");
        } else {
            $(".main-menu").removeClass("is-toggled");
        }
    });


    svg4everybody();

    // button ripple
    //$('[ripple]').append('<div class="ripple--container"></div>');
    var cleanUp, debounce, i, len, ripple, rippleContainer, ripples, showRipple, outClose;

    debounce = function (func, delay) {
        var inDebounce;
        inDebounce = undefined;
        return function () {
            var args, context;
            context = this;
            args = arguments;
            clearTimeout(inDebounce);
            return inDebounce = setTimeout(function () {
                return func.apply(context, args);
            }, delay);
        };
    };


    showRipple = function (e) {
        var pos, ripple, rippler, size, style, x, y;
        ripple = this;
        rippler = document.createElement('span');
        size = ripple.offsetWidth;
        pos = ripple.getBoundingClientRect();
        x = e.offsetX - (size / 2);
        y = e.offsetY - (size / 2);
        style = 'top:' + y + 'px; left: ' + x + 'px; height: ' + size + 'px; width: ' + size + 'px;';
        ripple.rippleContainer.appendChild(rippler);
        return rippler.setAttribute('style', style);
    };

    cleanUp = function () {
        while (this.rippleContainer.firstChild) {
            this.rippleContainer.removeChild(this.rippleContainer.firstChild);
        }
    };

    outClose = function (time) {
        time = time ? time : 150;
        // header notification
        $('.profile__item--notification').removeClass('active').find('.notification-list').slideUp(time);

        // profile menu
        $('.profile__user').removeClass('active').find('.profile__menu').slideUp(time);

        $('.dropdown, .dropdown-select').removeClass('active');
        $('.dropdown-list').slideUp(time, function () {
            $(this).find('.assign--buttons').show();
            $(this).find('.assign--list').hide();
        });
        $('.form__search_type').slideUp(150);
        $('.form__search_results').slideUp(150);
    }

    dropdownSelectRender = function (el) {
        var select = $(el).find('select');
        var options = [];
        var value;
        select.find('option').each(function (i, el) {
            options.push({
                val: $(el).val(),
                text: $(el).text(),
                selected: $(el).is(':selected')
            });
            if ($(el).is(':selected')) {
                value = $(el).text();
            }
        });
        var heskPath = $('input[type="hidden"][name="HESK_PATH"]').val();
        var template = '<div class="label"><span>' + escapeHtml(value) + '</span><svg class="icon icon-chevron-down"><use xlink:href="' + heskPath + 'img/sprite.svg#icon-chevron-down"></use></svg></div><ul class="dropdown-list">';
        for (var i in options) {
            if (options[i].selected) $(el).attr('data-value', options[i].val);
            template += '<li data-option="' + options[i].val + '"' + (options[i].selected ? ' class="selected"' : '') + '>' + escapeHtml(options[i].text) + '</li>'
        }
        template += '</ul></div>';
        $(el).append(template);
    }

    ripples = document.querySelectorAll('[ripple]');

    for (i = 0, len = ripples.length; i < len; i++) {
        ripple = ripples[i];
        rippleContainer = document.createElement('div');
        rippleContainer.className = 'ripple--container';
        ripple.addEventListener('mousedown', showRipple);
        ripple.addEventListener('mouseup', debounce(cleanUp, 10000));
        ripple.rippleContainer = rippleContainer;
        ripple.appendChild(rippleContainer);
    }

    // show/hide password
    $('.input-group-append--icon').on('click', function (e) {
        var $passwordField = $(this).closest('.form-group').find('input');
        var $iconUrl = $(this).find('use').attr('xlink:href');
        if ($passwordField.attr('type') == 'text') {
            $passwordField.attr('type', 'password');
            $(this).find('svg').removeClass('icon-eye-open').addClass('icon-eye-close');
            $iconUrl = $iconUrl.replace('eye-open', 'eye-close');
            $(this).find('use').attr('xlink:href', $iconUrl);
        } else if ($passwordField.attr('type') == 'password') {
            $passwordField.attr('type', 'text');
            $(this).toggleClass('passwordIsHidden');
            $iconUrl = $iconUrl.replace('eye-close', 'eye-open');
            $(this).find('use').attr('xlink:href', $iconUrl);
            $(this).find('svg').removeClass('icon-eye-close').addClass('icon-eye-open');
        }
    });
    // end show/hide password

    // toggle submenu
    $(".listitem.submenu").click(
        function (e) {
            if (!$(this).hasClass('submenu-is-opened')) {
                $('.submenu.submenu-is-opened .submenu__list').slideUp(400, function () {
                    $(this).closest('.submenu-is-opened').removeClass('submenu-is-opened');
                });
            }
            if (!$(e.target).closest('.submenu__list').length) {
                e.preventDefault();
                console.log($(this).hasClass('submenu-is-opened'));
                $(this).find(".submenu__list").stop(true, true).slideToggle(150);
                $(this).toggleClass("submenu-is-opened");

            } else {
                location.href = $(e.target).find('a').attr('href');
            }
        }
    );
    // $(".is-toggled .listitem").hover(
    //   function () {
    //     var $lengthToTop = $(this).closest(".listitem").offset();
    //     $(this).find(".listitem__menu").css("top", $lengthToTop.top)
    //   });
    // end toggle submenu

    // toggle Main menu
    $("#navbarToggler").click(function () {
        console.log()
        if(!$(this).closest(".main-menu").hasClass("is-toggled")){
            localStorage.setItem('main_menu', 'close');
            $(this).closest(".main-menu").addClass("is-toggled");
        }else{
            localStorage.setItem('main_menu', 'open');
            $(this).closest(".main-menu").removeClass("is-toggled");
        }

    })
    // end toggle Main menu
    if ($(".table").length > 0) {
        $(".table__td-id .checkbox-custom label").click(function () {
            $(this).closest("tr").toggleClass("is-checked");
        })
    }

    $('.checkbox-custom input[type="checkbox"]').change(function (e) {
        if ($(e.target).is(':checked')) {
            $(e.target).closest('.checkbox-custom').addClass('checked');
        } else {
            $(e.target).closest('.checkbox-custom').removeClass('checked');
        }
    });

    // Custom select
    var x, i, j, selElmnt, a, b, c;
    /*look for any elements with the class "select-custom":*/
    x = document.getElementsByClassName('select-custom');
    for (i = 0; i < x.length; i++) {
        selElmnt = x[i].getElementsByTagName('select')[0];
        /*for each element, create a new DIV that will act as the selected item:*/
        a = document.createElement('DIV');
        a.setAttribute('class', 'select-selected');
        a.dataset.value = selElmnt[0].value;
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        x[i].insertBefore(a, selElmnt);
        // x[i].insertBefore(a, x[i].firstChild);

        /*for each element, create a new DIV that will contain the option list:*/
        b = document.createElement('DIV');
        b.setAttribute('class', 'select-items select-hide');
        for (j = 1; j < selElmnt.length; j++) {
            /*for each option in the original select element,
          create a new DIV that will act as an option item:*/
            c = document.createElement('DIV');
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener('click', function (e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName('select')[0];
                h = this.parentNode.previousSibling;
                for (i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentNode.getElementsByClassName('same-as-selected');
                        for (k = 0; k < y.length; k++) {
                            y[k].removeAttribute('class');
                        }
                        this.setAttribute('class', 'same-as-selected');
                        h.dataset.value = s.options[i].getAttribute('value');
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        x[i].insertBefore(b, selElmnt);
        a.addEventListener('click', function (e) {
            /*when the select box is clicked, close any other select boxes,
            and open/close the current select box:*/
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle('select-hide');
            this.classList.toggle('select-arrow-active');
        });
    }

    function closeAllSelect(elmnt) {
        /*a function that will close all select boxes in the document,
      except the current select box:*/
        var x, y, i, arrNo = [];
        x = document.getElementsByClassName('select-items');
        y = document.getElementsByClassName('select-selected');
        for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove('select-arrow-active');
            }
        }
        for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add('select-hide');
            }
        }


        if (!$(elmnt.target).closest('.out-close').length) outClose();
        if ($(elmnt.target).closest('.dropdown').length) return;


        event.stopPropagation();
    }


    /*if the user clicks anywhere outside the select box,


  then close all select boxes:*/
    var documentClick = true;
    $(document).click(closeAllSelect);
    $(document).on('touchend', 'body', function (e) {
        if (documentClick) {
            $(document).unbind('click');
            documentClick = false;
        }
        closeAllSelect(e);
    });
    // $('body').on('click', '.selectize-dropdown', function(e){
    //   console.log(e);
    // });

    // Toggle table filters
    if ($(".filters").length > 0) {
        var filtersListing = $("#filtersListing");
        var filtersBtnToggle = $("#btnToggleFilters");
        var filtersAction = $("#filtersAction");
        function toggleFilters() {
            filtersBtnToggle.find(".toggler-value").text(filtersListing.find(".filter-item").length);
            if (filtersListing.hasClass("is-collapsed")) {
                filtersListing.removeClass("is-collapsed");
                filtersListing.find(".overflowed").unwrap().removeClass("overflowed");
                filtersBtnToggle.find(".toggler-text").text("Hide");
            } else {
                filtersBtnToggle.find(".toggler-text").text("Show all");
                var btnWidth = filtersBtnToggle.width() + parseInt(filtersBtnToggle.css("marginLeft"));
                var temporaryWidth = filtersListing.width() - btnWidth - filtersAction.width() + 200;
                var filtersListingRowWidth = btnWidth + filtersAction.width();
                filtersListing.children('.filter-item').each(function (index, value) {
                    var tempWidth = filtersListingRowWidth + $(this).width() + parseInt($(this).css('marginLeft'), 10);
                    if (temporaryWidth > tempWidth) {
                        filtersListingRowWidth = tempWidth;
                    } else {
                        $(this).addClass('overflowed');
                    }
                })
                filtersBtnToggle.removeClass("overflowed");
                filtersListing.find(".overflowed").wrapAll("<div class='filtersListingCollapsed' />");
                filtersListing.addClass('is-collapsed');
            }
        }
        toggleFilters()
        filtersBtnToggle.click(function () {
            toggleFilters()
        })
    }

    $('.filters-mobile [data-action="mobile-filters-more"]').click(function () {
        $('.filters-mobile').toggleClass('open');
    });
    $('.filters-mobile [data-action="mobile-filters-hide"]').click(function () {
        $('.filters-mobile').toggleClass('open');
    });

    // end Toggle table filters

    $('[data-action="go-back"]').click(function (e) {
        window.history.go(-1);
        e.preventDefault();
    });

    /* ===========================================================
                          FORM VALIDATION
      ============================================================*/
    $('#login-form').submit(function (e) {
        var login = $.trim($('#regInputUsername').val()).length;
        var pass = $('#regInputPassword').val().length;
        if (!login) {
            $('#regInputUsername').closest('.form-group').addClass('error');
            e.preventDefault();
        }
        if (!pass) {
            $('#regInputPassword').closest('.form-group').addClass('error');
            e.preventDefault();
        }
        if (login && pass) {
            // For example
            $(e.target).addClass('invalid');
            e.preventDefault();
        }
    });

    $('#login-form input').keyup(function (e) {
        if ($(e.target).val()) {
            $(e.target).closest('.form-group').removeClass('error');
        }
    });
    $('#delInputPassword').keyup(function (e) {
        // For example
        if ($(e.target).val().length) {
            $('#delete-form .btn-full').removeAttr('disabled');
        } else {
            $('#delete-form .btn-full').attr('disabled', 'disabled');
        }
    });
    $('#header-search').focus(function (e) {
        $('.form__search').addClass('focus');
        if(!$('.form__search').hasClass('type')){
            $('.form__search_type').slideDown(150);
        }
    });
    $('#header-search').blur(function (e) {
        $('.form__search').removeClass('focus');
    });
    $('#header-search').keyup(function (e) {
        var val = $.trim($(this).val());
        if (val.length) {
            $('.form__search').addClass('value');
        } else {
            $('.form__search').removeClass('value');
        }
    });
    $('.form__search .search--type').click(function(e){
        $('.form__search_results').slideUp(150);
        $('.form__search_type').slideDown(150);
    });
    $('.form__search_type .type--list [data-type]').click(function(e){
        var type = $(this).attr('data-type');
        $('.form__search').addClass('type value').find('input').attr('placeholder', '').prop('readonly', false).focus();
        $('.form__search .search-clear').show();
        $('.form__search .search--type').html(type+':').show();
        $('.form__search_type').slideUp(150);
    });
    $('.form__search .search-clear').click(function (e) {
        $('#header-search').val('').attr('placeholder', 'Search for tickets, templates, articles, team members').prop('readonly', true);
        $('.form__search').removeClass(['value', 'type']);
        $('#header-search').focus();
        $('.form__search .search--type').hide().html('');
        $('.form__search_results').slideUp(150);
    });

    $('.topmenu__list .topmenu__item').mouseenter(function (e) {
        if (!$(this).find('.topmenu__dropdown').length) return;
        var w = $(this).find('.topmenu__dropdown').width();
        var left = $(this).offset().left - ((w / 2) - ($(this).width() / 2)) < 0;
        var right = ($(this).offset().left + $(this).width()) + ((w / 2) - ($(this).width() / 2)) > $(document).width();
        if (left) {
            $(this).find('.topmenu__dropdown').css('left', 0);
        } else if (right) {
            $(this).find('.topmenu__dropdown').css({
                'left': 'auto',
                'right': 0
            });
        } else {
            $(this).find('.topmenu__dropdown').removeAttr('style');
        }
    });

    $('[data-action="advanced-search"]').click(function(e){
        $('.right-bar.advanced-search').fadeIn(150);
    });

    /* ===========================================================
                    Dropdown & dropdown selects
    ============================================================*/

    $('.dropdown-select').each(function (i, el) {
        dropdownSelectRender(el);
    });



    $('body').on('click', '.dropdown > label', function (e) {
        if ($(e.currentTarget).closest('.dropdown').hasClass('active')) {
            $(e.currentTarget).closest('.dropdown').removeClass('active').find('.dropdown-list').slideUp(150);
        } else {
            $('.dropdown').removeClass('active');
            $('.dropdown-list').slideUp(150);
            $(e.currentTarget).closest('.dropdown').addClass('active').find('.dropdown-list').slideDown(150);
        }
    });
    $('body').on('click', '.dropdown-list > li', function (e) {
        if ($(e.currentTarget).hasClass('noclose')) return;
        $(e.currentTarget).closest('.dropdown').removeClass('active').find('.dropdown-list').slideUp(150);
    });
    $('body').on('click', '.dropdown-select .label', function (e) {
        if ($(e.currentTarget).closest('.dropdown-select').hasClass('active')) {
            $(e.currentTarget).closest('.dropdown-select').removeClass('active').find('.dropdown-list').slideUp(150);
        } else {
            $('.dropdown-select').removeClass('active');
            $('.dropdown-list').slideUp(150);
            $(e.currentTarget).closest('.dropdown-select').addClass('active').find('.dropdown-list').slideDown(150);
        }
    });
    $('body').on('click', '.dropdown-list > li', function (e) {
        if ($(e.currentTarget).hasClass('noclose')) return;
        $(e.currentTarget).closest('.dropdown').removeClass('active').find('.dropdown-list').slideUp(150);
    });
    $('body').on('click', '.dropdown-select .dropdown-list li', function (e) {
        var text, value;
        value = $(e.currentTarget).attr('data-option');
        if ($(e.currentTarget).closest('.dropdown-select').hasClass('submit-us')) {
            text = value.length ? 'Submit as ' + $(e.currentTarget).text() : $(e.currentTarget).text();
            text = text.toLowerCase().charAt(0).toUpperCase() + text.toLowerCase().substr(1);
        } else {
            text = $(e.currentTarget).text();
        }
        $(e.currentTarget).closest('.dropdown-list').find('li').removeClass('selected');
        $(e.currentTarget).addClass('selected');
        $(e.currentTarget).closest('.dropdown-select').attr('data-value', value).find('.label span').text(text);;
        $(e.currentTarget).closest('.dropdown-select').removeClass('active');
        $(e.currentTarget).closest('.dropdown-list').slideUp(150);
        $(e.currentTarget).closest('.dropdown-select').find('select option[value="' + value + '"]').prop('selected', true);
        $(e.currentTarget).closest('.dropdown-select').find('select').trigger('change');
    });

    // End Dropdown & dropdown selects


    /* ===========================================================
                        Ticket details
    ============================================================*/
    $('.ticket__replies_link').click(function (e) {
        if ($(e.currentTarget).hasClass('visible')) {
            $(e.currentTarget).removeClass('visible');
            $('.ticket__replies_list').slideUp(150);
        } else {
            $('.ticket__replies_list').slideDown(150);
            $(e.currentTarget).addClass('visible');
        }
    });

    // Ticket upload file
    var ticketFiles = [];
    $('.block--attach input[type="file"]').change(function (e) {
        for (i = 0; i < e.target.files.length; i++) {
            ticketFiles.push(e.target.files[i]);
            var extension = '.' + e.target.files[i].name.split('.')[e.target.files[i].name.split('.').length - 1];
            var name = '';
            for (n = 0; n < e.target.files[i].name.split('.').length; n++) {
                if (n < (e.target.files[i].name.split('.').length - 1)) {
                    name += e.target.files[i].name.split('.')[n];
                }
            }
            if (name.length > 16) name = name.slice(0, 10) + '...' + name.slice((name.length - 8), name.length);
            var label = '<div><span>' + name + extension + '</span><i><svg class="icon icon-close"><use xlink:href="./img/sprite.svg#icon-close"></use></svg></i></div>';
            $('.block--attach-list').append(label);
            $('.block--attach-list div').each(function (i, el) {
                $(el).attr('data-i', i);
            });
        }
    });
    $('body').on('click', '.block--attach-list div i', function (e) {
        var i = Number($(e.target).closest('div').attr('data-i'));
        ticketFiles.splice(i, 1);
        $(e.currentTarget).closest('div').slideUp(150, function () {
            $(e.currentTarget).closest('div').remove();
            $('.block--attach-list div').each(function (i, el) {
                $(el).attr('data-i', i);
            })
        });
        console.log(ticketFiles);
    });

    $('.accordion-title').click(function (e) {
        if ($(e.currentTarget).closest('.accordion').hasClass('visible')) {
            $(e.currentTarget).closest('.accordion').find('.accordion-body').slideUp(150);
            $(e.currentTarget).closest('.accordion').removeClass('visible');
        } else {
            $(e.currentTarget).closest('.accordion').find('.accordion-body').slideDown(150);
            $(e.currentTarget).closest('.accordion').addClass('visible');
        }
    });

    $('.filter-item .close').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).closest('.filter-item').remove();
        $('#btnToggleFilters .toggler-value').text($('.filters .filters__listing .filter-item').length);
    });
    $('.filter-item.group input[type="checkbox"]').change(function(e){
        e.preventDefault();
        e.stopPropagation();
        $('.filter-item.group input[type="checkbox"]:checked').prop('checked', false);
        $(this).prop('checked', true);
    });

    /* ===========================================================
                          Templates
    ============================================================*/

    // Template Create/Edit
    var openCreateTemplate = function (e) {
        $('.right-bar.template-create').fadeIn(150, function () {
            $(this).find('.right-bar__body').css('transform', 'translateX(0%)');
        });
    };
    var closeRightBar = function (e) {
        var link = $('.right-bar__body h3 a')[0];
        if (link && link.href !== '' && link.href !== 'javascript:') {
            window.location.href = link.href;
        }

        $('.right-bar').fadeOut(150);
        $('body').removeClass('noscroll');
    };
    $('body').on('click', '[data-action="create-template"], [data-action="edit-template"]', function (e) {
        openCreateTemplate(e);
        $('input:text:visible:first').focus();
        e.preventDefault();
    });
    $('.right-bar').click(function (e) {
        if ($(e.target).closest('.right-bar__body').length) return;
        closeRightBar(e);
    });
    $('.right-bar__body h3 a').click(function (e) {
        closeRightBar(e);

        if (e.currentTarget.href === '' || e.currentTarget.href === 'javascript:') {
            e.preventDefault();
        }
    });
    $('[data-action="delete-template"]').click(function (e) {
        openCreateTemplate(e);
        e.preventDefault();
    });


    // Template Delete
    var lastDeletedTemplate = {};
    $('body').on('click', '[data-action="delete"]', function (e) {
        var name = $(e.target).closest('li').find('h3').text();
        var type = $(e.target).closest('ul').attr('class') == 'response__list' ? 'response' : 'ticket';
        $(this).closest('li').addClass('pre-delete');
        $('.modal.templates .modal__description').html(name);
        $('.modal.templates h3 span').html(type);
        openModal(e, $('.modal.templates'));
        e.preventDefault();
    });
    $('.modal').click(function (e) {
        if ($(e.target).hasClass('modal')) closeModal(e);
        //if($(e.target).attr('data-action') == 'modal-close' || $(e.target).closest('[data-action="modal-close"]').length || $(e.target).closest('.modal__body').length == 0)closeModal(e);
    });
    $('[data-action="template-delete-confirm"]').click(function (e) {
        var type = $('.pre-delete').closest('ul').attr('class') == 'response__list' ? 'response' : 'ticket';
        var name = $('.pre-delete h3').text();
        $('.pre-delete').slideUp(150, function (e) {
            $(this).addClass('deleted');
            $(this).closest('ul').find('li').each(function (i, el) {
                if ($(this).hasClass('deleted')) {
                    lastDeletedTemplate = {
                        type: type,
                        position: i,
                        el: el
                    }
                }
            });
            $(this).remove();
            console.log(lastDeletedTemplate);
        });
        closeModal();
        $('[data-type="template-delete"] .notification--title').text('You deleted the ' + type);
        $('[data-type="template-delete"] .notification--text').text(name);
        $('[data-type="template-delete"]').fadeIn(150);
    });
    $('[data-action="template-delete-cancel"]').click(function (e) {
        var type = lastDeletedTemplate.type == 'response' ? '.response__list' : '.ticket__list';
        if (lastDeletedTemplate.position == 0) {
            $(type).prepend(lastDeletedTemplate.el);
        } else {
            $(type + ' li:nth-child(' + lastDeletedTemplate.position + ')').after(lastDeletedTemplate.el);
        }
        $('.deleted').slideDown(150, function () {
            $(this).removeClass('deleted');
        });
        $(this).closest('.notification-flash').fadeOut(150);
    });



    /* ===========================================================
                             Header
   ============================================================*/
    // Header events
    $('[data-action="show-notification"]').click(function (e) {
        if ($(this).closest('.profile__item').hasClass('active')) {
            $(this).closest('.profile__item').removeClass('active').find('.notification-list').slideUp(150);
        } else {
            outClose();
            $(this).closest('.profile__item').addClass('active').find('.notification-list').slideDown(150);
        }
    });
    $('[data-action="show-profile"]').click(function (e) {
        if ($('.profile__user').hasClass('active')) {
            $('.profile__user').removeClass('active').find('.profile__menu').slideUp(150);
        } else {
            outClose();
            $('.profile__user').addClass('active').find('.profile__menu').slideDown(150);
        }
    });



    /* ===========================================================
                             Modals
     ============================================================*/
    var openModal = function (e, el) {
        //$('body').addClass('noscroll');
        el.fadeIn(150);
    };
    $('[data-modal]').click(function() {
        $this = $(this);
        if ($this.attr('data-callback') !== undefined) {
            window[$this.attr('data-callback')]($this);
        }
        openModal(undefined, $('.modal' + $this.attr('data-modal')));
    });

    var closeModal = function (e) {
        if ($('.right-bar').is(':hidden') || !$('.right-bar').length) {
            $('body').removeClass('noscroll');
        }
        $('.modal').fadeOut(150);
        $('.pre-delete').removeClass('pre-delete');
    };

    $('.notification-flash .close').click(function (e) {
        $(this).closest('.notification-flash').fadeOut(150);
    });
    $('.notification-bar .close').click(function (e) {
        $(this).closest('.notification-bar').fadeOut(150);
    });





    /* ===========================================================
                           Tickets list
   ============================================================*/
    // Tickets Filters
    $('[data-action="filter--search"]').keyup(function (e) {
        if ($(e.target).val().length) {
            $(this).closest('.form-group').find('.search-clear').css('opacity', 1);
        } else {
            $(this).closest('.form-group').find('.search-clear').css('opacity', 0);
        }
        $('.search--list .checkbox-custom').filter(function () {
            $(this).toggle($(this).find('label').text().toLowerCase().indexOf($(e.target).val()) > -1);
        });
    });
    $('.right-bar.filter-list .filter--search .search-clear').click(function (e) {
        $('.search--list .checkbox-custom').filter(function () {
            $(this).toggle($(this).find('label').text().toLowerCase().indexOf('') > -1);
        });
        $(this).closest('.form-group').find('[data-action="filter--search"]').val('');
        $(this).css('opacity', 0);
    });
    $('.filter-list .section--title a').click(function (e) {
        if ($(this).hasClass('all-selected')) {
            $(this).removeClass('all-selected').text('Select all').closest('.filter-list__section').find('input[type="checkbox"]').prop('checked', false).change();
        } else {
            $(this).addClass('all-selected').text('Deselect all').closest('.filter-list__section').find('input[type="checkbox"]').prop('checked', true).change();
        }
        e.preventDefault();
    });
    $('.filter-list__section input[type="checkbox"]').change(function (e) {
        var all = $(this).closest('.filter-list__section').find('input[type="checkbox"]').length;
        var checked = $(this).closest('.filter-list__section').find('input[type="checkbox"]:checked').length;
        if (all == checked) {
            $(this).closest('.filter-list__section').find('.section--title a').addClass('all-selected').text('Deselect all')
        } else {
            if ($(this).closest('.filter-list__section').find('.section--title a').hasClass('all-selected')) {
                $(this).closest('.filter-list__section').find('.section--title a').removeClass('all-selected').text('Select all')
            }
        }
    });
    $('table thead [data-action="select-all"]').change(function (e) {
        var checked = $(this).is(':checked');
        $(this).closest('table').find('tbody .table__first_td input[type="checkbox"]').prop('checked', checked);
        if (checked) {
            $('.topmenu, .botmenu').addClass('active');
        } else {
            $('.topmenu, .botmenu').removeClass('active');
        }
    });
    $('.right-bar__body.filter-list__body input[type="checkbox"]').change(function (e) {
        if ($('.right-bar__body.filter-list__body input[type="checkbox"]:checked').length) {
            $('.right-bar__body.filter-list__body [data-action="filters-save-group"]').prop('disabled', false);
        } else {
            $('.right-bar__body.filter-list__body [data-action="filters-save-group"]').prop('disabled', true);
        }
    });

    // $('.right-bar__body li').filter(function(){
    //   $(this).toggle($(this).text().toLowerCase().indexOf('at') > -1)
    // });



    // Tickets
    if ($('.assign--list select').length) {
        $('.assign--list select').selectize();
    }
    if ($('.bulk-actions select').length) {
        $('.bulk-actions select').selectize();
    }
    if ($('.search-options select').length) {
        $('.search-options select').selectize();
    }

    $('[data-action="add-filters"], [data-action="ticket-mobile-filters"]').click(function (e) {
        $('body').toggleClass('noscroll');
        $('.filter-list').fadeIn(150);
    });

    $('.dropdown.assignment .assign__body > li > a').click(function (e) {
        var type = $(e.currentTarget).closest('li').attr('data-type')
        console.log(type);
        if (type == 'to-my') {
            $(e.currentTarget).closest('.assign__wrapper').removeClass('unassigned').removeClass('assign').addClass('to-my');
            $(e.currentTarget).closest('.assign__wrapper').find('.assign__head .assign__head_name b').text('To my');
            $(e.currentTarget).closest('.assign__wrapper').find('.assign__head .assign__head_name span').text('Assigned to me');
            $(e.currentTarget).closest('.dropdown').find('label span').text('To my');
            outClose(10);
        } else if (type == 'unassigned') {
            $(e.currentTarget).closest('.assign__wrapper').removeClass('to-my').removeClass('assign').addClass('unassigned');
            $(e.currentTarget).closest('.assign__wrapper').find('.assign__head .assign__head_name b').text('Unassigned');
            $(e.currentTarget).closest('.assign__wrapper').find('.assign__head .assign__head_name span').text('This ticket is not assigned to anyone');
            $(e.currentTarget).closest('.dropdown').find('label span').text('Unassigned');
            outClose(10);
        } else if (type == 'assign') {

            var $select = $(e.currentTarget).closest('.dropdown').find('select').selectize();
            var selectize = $select[0].selectize; // This stores the selectize object to a variable (with name 'selectize')
            selectize.clear();
            $(e.currentTarget).closest('.dropdown').find('.assign--buttons').hide();
            $(e.currentTarget).closest('.dropdown').find('.assign--list').show();

        }
        e.preventDefault();
    });
    $('.dropdown.assignment .assign--list [data-action="close"]').click(function (e) {
        $(e.currentTarget).closest('.dropdown').find('.assign--buttons').show();
        $(e.currentTarget).closest('.dropdown').find('.assign--list').hide();
    });
    $('.dropdown.assignment .assign--list [data-action="save"]').click(function (e) {
        var val = $(e.currentTarget).closest('.assign--list').find('select').val();
        if ($.trim(val).length) {
            $(e.currentTarget).closest('.dropdown').find('.assign__wrapper').removeClass('unassigned').removeClass('to-my').addClass('assign');
            $(e.currentTarget).closest('.dropdown').find('.assign__head .assign__head_name b').text(val);
            $(e.currentTarget).closest('.dropdown').find('.assign__head .assign__head_name span').text('Assigned to ' + val);
            $(e.currentTarget).closest('.dropdown').find('label span').text(val);
            outClose(10);
        }
    });
    $('#default-table .table__first_td input[type="checkbox"]').change(function (e) {
        if ($(this).is(':checked')) {
            $(this).closest('tr').addClass('selected');
        } else {
            $(this).closest('tr').removeClass('selected');
        }
        var checked = $('#default-table .table__first_td input[type="checkbox"]:checked').length;
        $('.topmenu > p').text(checked + ' tasks selected')
        if (checked > 0) {
            $('.topmenu, .botmenu').addClass('active');
        } else {
            $('.topmenu, .botmenu').removeClass('active');
        }
    });
    $('.tickets__mobile_head [data-action="ticket-mobile-actions"]').click(function (e) {
        $('.main__content.tickets').toggleClass('actions');
    });
    $('[data-action="tickets-select-dismiss"]').click(function (e) {
        $('.topmenu, .botmenu').removeClass('active');
        $('#default-table .table__first_th input[type="checkbox"]:checked, #default-table .table__first_td input[type="checkbox"]:checked').prop('checked', false);
    })


    /* ===========================================================
                            Clipboard
      ============================================================*/
    function coptToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.style.position = 'absolute';
        textArea.style.top = '-10000px';
        textArea.style.left = '-10000px';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            var successful = document.execCommand("copy");
            var msg = successful ? "successful" : "unsuccessful";
            console.log("Fallback: Copying text command was " + msg);
        } catch (err) {
            console.error("Fallback: Oops, unable to copy", err);
        }

        document.body.removeChild(textArea);
    }
    function copyTextToClipboard(text) {
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(
            function () {
                console.log("Async: Copying to clipboard was successful!");
            },
            function (err) {
                console.error("Async: Could not copy text: ", err);
            }
        );
    }


    /* ===========================================================
                            Categories
      ============================================================*/
    $(document).on('click', '[data-action="generate-link"]', function (e) {
        coptToClipboard($(this).data('link'));
        $('[data-type="link-generate-message"]').fadeIn(150, function () {
            var notification = $(this);
            setTimeout(function () {
                notification.fadeOut(150);
            }, 3000);
        });
        e.preventDefault();
    });
    $('[data-action="category-create"]').click(function (e) {
        $('.right-bar.category-create').fadeIn(150);
        $('body').addClass('noscroll');
        $('input:text:visible:first').focus();
        e.preventDefault();
    });


    /* ===========================================================
                            Team
    ============================================================*/
    $('[data-action="team-create"]').click(function (e) {
        $('.right-bar.team-create').fadeIn(150);
        $('body').addClass('noscroll');
        $('input:text:visible:first').focus();
        e.preventDefault();
    });
    $('.right-bar.team-create [data-action="next"]').click(function (e) {
        var step = Number($('.right-bar.team-create .right-bar__body').attr('data-step')) + 1;
        $('.right-bar.team-create .right-bar__body').attr('data-step', step);
    });
    $('.right-bar.team-create [data-action="back"]').click(function (e) {
        var step = Number($('.right-bar.team-create .right-bar__body').attr('data-step')) - 1;
        $('.right-bar.team-create .right-bar__body').attr('data-step', step);
    });
    $('.right-bar.team-create [data-action="save"]').click(function (e) {
        // FOR EXEMPLES
        var rand = 0 - 0.5 + Math.random() * (7 - 0 + 1)
        rand = Math.round(rand);
        var newTeam = '<tr class="team-new">' + $($('.table tbody tr')[rand]).html() + '</tr>';
        $('.team .table tbody').prepend(newTeam);
        $('.right-bar.team-create').fadeOut(150).find('.right-bar__body').attr('data-step', 1);
        $('.notification-flash[data-type="team-created-confirm"]').fadeIn(150, function () {
            var notification = $(this);
            setTimeout(function () {
                notification.fadeOut(150);
            }, 3000);
        });
    });
    $('.modal.team-delete [data-action="cancel"]').click(function () {
        $('.modal.team-delete').fadeOut(150);
    });
    $('.modal.team-delete [data-action="close"]').click(function (e) {
        $('.team-create').fadeOut(150, closeModal).find('.right-bar__body').attr('data-step', 1);

    });



    /* ===========================================================
                            Create ticket
    ============================================================*/

    if ( $.isFunction($.fn.datepicker) ) {
        $('.datepicker').datepicker({
            language: 'en',
            position: 'right top',
            autoClose: true,
            onSelect: function (formattedDate, date, inst) {
                if (formattedDate.length) {
                    inst.$el
                        .parent()
                        .parent()
                        .find('.calendar--value').fadeIn(150).find('span').text(formattedDate);
                }
            },
            onHide: function (inst, animationCompleted) {
                $('.param.calendar button').removeClass('active');
            }
        });
    } /* End if datepicker */

    $('.param.calendar button').click(function (e) {
        $(this).addClass('active');
        $(this).parent()
            .find('.datepicker')
            .data("datepicker")
            .show();
    });
    $('.param.calendar .close').click(function (e) {
        $(this).parent().parent()
            .find('.calendar--button')
            .find('.datepicker')
            .data("datepicker")
            .clear();
        $('.param.calendar .calendar--value').fadeOut(150, function () {
            $(this).find('span').text('');
        })
    });
    $('.right-bar.ticket-create .step-1 .cayrgory-list li').click(function (e) {
        $('.right-bar.ticket-create .right-bar__body').attr('data-step', 2);
    });
    $('.right-bar.ticket-create [data-action="next"]').click(function (e) {
        var step = Number($('.right-bar.ticket-create .right-bar__body').attr('data-step')) + 1;
        $('.right-bar.ticket-create .right-bar__body').attr('data-step', step);
    });
    $('.right-bar.ticket-create [data-action="back"]').click(function (e) {
        var step = Number($('.right-bar.ticket-create .right-bar__body').attr('data-step')) - 1;
        $('.right-bar.ticket-create .right-bar__body').attr('data-step', step);
    });
    $('.right-bar.ticket-create [data-action="save"]').click(function (e) {
        // FOR EXEMPLES
        var rand = 0 - 0.5 + Math.random() * (7 - 0 + 1)
        rand = Math.round(rand);
        var newTeam = '<tr class="new ticket-new">' + $($('.table tbody tr')[rand]).html() + '</tr>';
        $('.table.ticket-list tbody').prepend(newTeam);
        $('.right-bar.ticket-create').fadeOut(150).find('.right-bar__body').attr('data-step', 1);
        $('.notification-flash[data-type="ticket-created-confirm"]').fadeIn(150, function () {
            var notification = $(this);
            setTimeout(function () {
                notification.fadeOut(150);
            }, 3000);
        });
        $('body').removeClass('noscroll');
    });





    /* ===========================================================
                              Profile
      ============================================================*/

    $('.right-bar .step-bar li').click(function (e) {
        var step = Number($(this).attr('data-link'));
        var current = Number($(this).closest('.right-bar__body').attr('data-step'));
        if (step != current) {
            $(this).closest('.right-bar__body').attr('data-step', step);
        }
    });
    $('.main__content.profile [data-action="profile-edit"]').click(function (e) {
        $('.right-bar.profile-edit').fadeIn(150);
        $('body').addClass('noscroll');
    });
    $('.main__content.profile [data-action="profile-delete"]').click(function (e) {
        $('.modal.profile-delete').fadeIn(150);
        e.preventDefault();
    });
    $('.modal [data-action="cancel"]').click(function (e) {
        e.preventDefault();
        closeModal();
    });
    $('[data-action="profile-log-out"]').click(function (e) {
        $('.modal.log-out').fadeIn(150);
        e.preventDefault();
    });
    $('.right-bar.profile-edit [data-action="save"]').click(function (e) {
        $(this).closest('.right-bar').fadeOut(150);
        $('body').removeClass('noscroll');
        $('.notification-bar[data-type="profile-saved"]').fadeIn(150);
    });
    $('#profile-photo-upload').change(function (e) {
        var reader = new FileReader();
        var img = $(this).closest('.profile__photo').find('.profile__photo_wrapper img');
        if (this.files && this.files[0]) {
            reader.onload = function (e) {
                img.attr('src', e.target.result);
                //el.html(img);
            }

            reader.readAsDataURL(this.files[0]);
            $(this).closest('.edit-modal__photo').find('.edit-modal__photo_delete').show();
        }
    });

    /* ===========================================================
                            Emails
    ============================================================*/
    /*$('.email__list_aside .list--item').click(function (e) {
        $('.email__list_aside .list--item').removeClass('current');
        $(this).addClass('current');
        if ($(this).hasClass('new')) $(this).removeClass('new');
    });
    $('.emails__head_tabs li').click(function (e) {
        var target = $(this).attr('data-link');
        $('.emails__head_tabs li').removeClass('current');
        $(this).addClass('current');
        $('.email__tabs').attr('class', 'email__tabs')
        $('.email__tabs').attr('data-current', target);
    });

    $('.main__content.emails [data-action="new-email"]').click(function (e) {
        $('.right-bar.email-create').fadeIn(150);
        $('body').addClass('noscroll');
        e.preventDefault();
    });*/
    if ($('#email-create-destination').length) {
        $('#email-create-destination').selectize();
    };
    if ($('#email-batch-process').length) {
        $('#email-batch-process').selectize();
    };


    /* ===========================================================
                            Tools
    ============================================================*/
    $('[data-action="create-service-message"]').click(function (e) {
        console.log(e);
        $('.right-bar.service-message-create').fadeIn(150);
        $('body').addClass('noscroll');
        $('input:text:visible:first').focus();
    });
    $('.right-bar.service-message-create [data-action="back"]').click(function (e) {
        $('.right-bar.service-message-create .right-bar__body').attr('data-step', 1);
    });
    $('.right-bar.service-message-create [data-action="next"]').click(function (e) {
        $('.right-bar.service-message-create .right-bar__body').attr('data-step', 2);
    });
    $('.right-bar.service-message-create [data-action="save"]').click(function (e) {
        // To do something
        $('.right-bar.service-message-create').fadeOut(150);
        $('body').removeClass('noscroll');
    });

    $('[data-action="edit-tools-email-template"]').click(function (e) {
        $('.right-bar.tools-email-template-edit').fadeIn(150);
        $('body').addClass('noscroll');
        e.preventDefault();
    });
    $('.right-bar.tools-email-template-edit [data-action="save-changes"]').click(function (e) {
        // To do something
        $('.right-bar.tools-email-template-edit').fadeOut(150);
        $('body').removeClass('noscroll');
    });

    $('[data-action="create-custom-field"]').click(function (e) {
        $('.right-bar.create-custom-field').fadeIn(150);
        $('body').addClass('noscroll');
        $('input:text:visible:first').focus();
    });
    $('.right-bar.create-custom-field [data-action="save"]').click(function (e) {
        // To do something
        $('.right-bar.create-custom-field').fadeOut(150);
        $('body').removeClass('noscroll');
    });

    $('[data-action="create-custom-status"]').click(function (e) {
        $('.right-bar.create-status').fadeIn(150);
        $('body').addClass('noscroll');
        $('input:text:visible:first').focus();
    });
    $('.right-bar.create-status [data-action="save"]').click(function (e) {
        // To do something
        $('.right-bar.create-status').fadeOut(150);
        $('body').removeClass('noscroll');
    });
    $('.right-bar.create-status [data-action="status-color"]').change(function (e) {
        var isOk = /^#[0-9A-F]{6}$/i.test($(this).val());
        if (isOk) {
            $(this).css('color', $(this).val());
            $(this).closest('.form-group').find('span').css('color', $(this).val());
        } else {
            $(this).css('color', '#26282a').val('');
            $(this).closest('.form-group').find('span').css('color', '#26282a');
        }
    });







    /* ===========================================================
                              Tooltyps
    ============================================================*/
    $('body').on('mouseenter', '.tooltype', function (e) {
        //$(this).find('.tooltype__content').fadeIn(150);
    });
    $('body').on('mouseleave', '.tooltype', function (e) {
        //$(this).find('.tooltype__content').fadeOut(150);
    });


    /* ===========================================================
                              Settings
    ============================================================*/
    $('.input-tags').selectize({
        persist: false,
        createOnBlur: true,
        create: true
    });
    if ($('#timezone-select').length) {
        $('#timezone-select').selectize();

    };


    /* ===========================================================
                           Knowledge base
     ============================================================*/
    $('.knowledge__head_tabs li').click(function (e) {
        var target = $(this).attr('data-link');
        $('.knowledge__head_tabs li').removeClass('current');
        $(this).addClass('current');
        $('.knowledge__tabs').attr('data-current', target);
    });
    $('.main__content.knowledge.category .category__list_head .toogle, .main__content.knowledge.category .category__list_head .show').click(function (e) {
        if ($(this).closest('.category__list').hasClass('visible')) {
            $(this).closest('.category__list').removeClass('visible').find('.category__list_table').slideUp(150);
        } else {
            $(this).closest('.category__list').addClass('visible').find('.category__list_table').slideDown(150);
        }
        e.preventDefault();
    });

    $('#knowledge-article-edit-keywords').selectize({
        plugins: ['remove_button'],
        delimiter: ',',
        persist: false,
        create: function (input) {
            return {
                value: input,
                text: input
            }
        }
    });
    $('.knowledge [data-action="knowledge-category-create"]').click(function (e) {
        $('.right-bar.knowledge-category-create').fadeIn(150);
        $('body').addClass('noscroll');
        e.preventDefault();
    });
    $('.knowledge [data-action="knowledge-sub-category-create"]').click(function (e) {
        $('.right-bar.knowledge-sub-category-create').fadeIn(150);
        $('body').addClass('noscroll');
        e.preventDefault();
    });
    $('.knowledge [data-action="knowledge-category-edit"]').click(function (e) {
        $('.right-bar.knowledge-category-edit').fadeIn(150);
        $('body').addClass('noscroll');
        e.preventDefault();
    });
    $('.knowledge [data-action="knowledge-category-edit"]').click(function (e) {
        $('.right-bar.knowledge-category-edit').fadeIn(150);
        $('body').addClass('noscroll');
        e.preventDefault();
    });
    $('.knowledge [data-action="knowledge-sub-category-edit"]').click(function (e) {
        $('.right-bar.knowledge-sub-category-edit').fadeIn(150);
        $('body').addClass('noscroll');
        e.preventDefault();
    });
    $('.knowledge').on('click', '[data-action="generate-link"]', function (e) {
        var generateLink = 'https://some-generate-link.html'
        coptToClipboard(generateLink);
        $('[data-type="link-generate-message"]').fadeIn(150, function () {
            var notification = $(this);
            setTimeout(function () {
                notification.fadeOut(150);
            }, 3000);
        });
        e.preventDefault();
    });

    if ( $.isFunction($.fn.datepicker) ) {
        $('#search-datepicker').datepicker({
            language: 'en',
            position: 'left top',
            autoClose: true,
            range: true,
            multipleDatesSeparator: ' - ',
            toggleSelected: false,
            onSelect: function (formattedDate, date, inst) {
                if (formattedDate.length) {
                    //$('.ticket-create .param.calendar .calendar--value').fadeIn(150).find('span').text(formattedDate);
                }
            },
            onHide: function (inst, animationCompleted) {
                //$('.ticket-create .param.calendar button').removeClass('active');
            }
        });
    } /* End if datepicker */


    /* ===========================================================
                          MOBILE LOGIC
    ============================================================*/
    $('.header__mobile [data-action="toggle-menu"]').click(function (e) {
        $('body').removeClass('show-search');
        $('body').toggleClass('show-menu');
    });
    $('.header__mobile [data-action="toggle-search"]').click(function (e) {
        $('body').toggleClass('show-search');
    });

    // Never allow typing in dropdowns
    $('.selectize-input input').prop('readonly', true);
});

// Show mail description
$('.email__list_aside .list--item').click(function (e) {
    var title = $(this).find('.head h5').text();
    $('.email__list_descr .head h3').text(title);
    $('.email__list_article').fadeIn(150).animate({ right: 0 }, 300);
});
$(".btn-hide-article").click(function () {
    $(this).closest('.email__list_article').animate({ right: "-100vw" }, 300);
});


// Search autocomplete
$('#header-search').keyup(function (e) {
    var val = $.trim($(this).val());
    if (val.length) {
        $('.form__search_results').slideDown(150);
    } else {
        $('.form__search_results').slideUp(150);
    }
});

// $('.right-bar__body li').filter(function(){
//   $(this).toggle($(this).text().toLowerCase().indexOf('at') > -1)
// });


/*
window.onload = function(){
    $('#loader').fadeOut(150);
};*/

function escapeHtml(html){
    var text = document.createTextNode(html);
    var p = document.createElement('p');
    p.appendChild(text);
    return p.innerHTML;
}
