/*eslint-disable */
$(document).ready(function() {
  svg4everybody();

  // button ripple
  //$('[ripple]').append('<div class="ripple--container"></div>');
  var cleanUp,
    debounce,
    i,
    len,
    ripple,
    rippleContainer,
    ripples,
    showRipple,
    outClose;

  debounce = function(func, delay) {
    var inDebounce;
    inDebounce = undefined;
    return function() {
      var args, context;
      context = this;
      args = arguments;
      clearTimeout(inDebounce);
      return (inDebounce = setTimeout(function() {
        return func.apply(context, args);
      }, delay));
    };
  };

  showRipple = function(e) {
    var pos, ripple, rippler, size, style, x, y;
    ripple = this;
    rippler = document.createElement("span");
    size = ripple.offsetWidth;
    pos = ripple.getBoundingClientRect();
    x = e.offsetX - size / 2;
    y = e.offsetY - size / 2;
    style =
      "top:" +
      y +
      "px; left: " +
      x +
      "px; height: " +
      size +
      "px; width: " +
      size +
      "px;";
    ripple.rippleContainer.appendChild(rippler);
    return rippler.setAttribute("style", style);
  };

  cleanUp = function() {
    while (this.rippleContainer.firstChild) {
      this.rippleContainer.removeChild(this.rippleContainer.firstChild);
    }
  };

  outClose = function(time) {
    time = time ? time : 150;
    // header notification
    $(".profile__item--notification")
      .removeClass("active")
      .find(".notification-list")
      .slideUp(time);

    // profile menu
    $(".profile__user")
      .removeClass("active")
      .find(".profile__menu")
      .slideUp(time);

    $(".dropdown, .dropdown-select").removeClass("active");
    $(".dropdown-list").slideUp(time, function() {
      $(this)
        .find(".assign--buttons")
        .show();
      $(this)
        .find(".assign--list")
        .hide();
    });
    $(".form__search_type").slideUp(150);
    $(".form__search_results").slideUp(150);
  };

  dropdownSelectRender = function(el) {
    var select = $(el).find("select");
    var options = [];
    var value;
    select.find("option").each(function(i, el) {
      options.push({
        val: $(el).val(),
        text: $(el).text(),
        selected: $(el).is(":selected")
      });
      if ($(el).is(":selected")) {
        value = $(el).text();
      }
    });
    var template =
      '<div class="label"><span>' +
      escapeHtml(value) +
      '</span><svg class="icon icon-chevron-down"><use xlink:href="./img/sprite.svg#icon-chevron-down"></use></svg></div><ul class="dropdown-list">';
    for (var i in options) {
      if (options[i].selected) $(el).attr("data-value", options[i].val);
      template +=
        '<li data-option="' +
        options[i].val +
        '"' +
        (options[i].selected ? ' class="selected"' : "") +
        ">" +
        escapeHtml(options[i].text) +
        "</li>";
    }
    template += "</ul></div>";
    $(el).append(template);
  };

  ripples = document.querySelectorAll("[ripple]");

  for (i = 0, len = ripples.length; i < len; i++) {
    ripple = ripples[i];
    rippleContainer = document.createElement("div");
    rippleContainer.className = "ripple--container";
    ripple.addEventListener("mousedown", showRipple);
    ripple.addEventListener("mouseup", debounce(cleanUp, 10000));
    ripple.rippleContainer = rippleContainer;
    ripple.appendChild(rippleContainer);
  }

  $('.checkbox-custom input[type="checkbox"]').change(function(e) {
    if ($(e.target).is(":checked")) {
      $(e.target)
        .closest(".checkbox-custom")
        .addClass("checked");
    } else {
      $(e.target)
        .closest(".checkbox-custom")
        .removeClass("checked");
    }
  });

  // Custom select
  var x, i, j, selElmnt, a, b, c;
  /*look for any elements with the class "select-custom":*/
  x = document.getElementsByClassName("select-custom");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.dataset.value = selElmnt[0].value;
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].insertBefore(a, selElmnt);
    // x[i].insertBefore(a, x[i].firstChild);

    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
      /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            h.dataset.value = s.options[i].getAttribute("value");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].insertBefore(b, selElmnt);
    a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
  except the current select box:*/
    var x,
      y,
      i,
      arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }

    if (!$(elmnt.target).closest(".out-close").length) outClose();
    if ($(elmnt.target).closest(".dropdown").length) return;

    event.stopPropagation();
  }

  /*if the user clicks anywhere outside the select box, then close all select boxes:*/
  var documentClick = true;
  $(document).click(closeAllSelect);
  $(document).on("touchend", "body", function(e) {
    if (documentClick) {
      $(document).unbind("click");
      documentClick = false;
    }
    closeAllSelect(e);
  });

  /* ===========================================================
                        FORM VALIDATION
    ============================================================*/
  $("#formNeedValidation").submit(function(e) {
    console.log("object");
    $(".form-group.required .form-control").each(function(index) {
      var value = $.trim($(this).val()).length;
      if (!value) {
        $(this)
          .closest(".form-group")
          .addClass("error");
        $(this)
          .closest(".form")
          .addClass("invalid");
        e.preventDefault();
      }
    });
  });

  $("#formNeedValidation input").keyup(function(e) {
    if ($(e.target).val()) {
      $(e.target).css({ borderColor: "#d4d6e3" });
      $(e.target)
        .closest(".form-group")
        .removeClass("error");
    }
  });

  /* ===========================================================
                  Dropdown & dropdown selects
  ============================================================*/

  $(".dropdown-select").each(function(i, el) {
    dropdownSelectRender(el);
  });

  $("body").on("click", ".dropdown > label", function(e) {
    if (
      $(e.currentTarget)
        .closest(".dropdown")
        .hasClass("active")
    ) {
      $(e.currentTarget)
        .closest(".dropdown")
        .removeClass("active")
        .find(".dropdown-list")
        .slideUp(150);
    } else {
      $(".dropdown").removeClass("active");
      $(".dropdown-list").slideUp(150);
      $(e.currentTarget)
        .closest(".dropdown")
        .addClass("active")
        .find(".dropdown-list")
        .slideDown(150);
    }
  });
  $("body").on("click", ".dropdown-list > li", function(e) {
    if ($(e.currentTarget).hasClass("noclose")) return;
    $(e.currentTarget)
      .closest(".dropdown")
      .removeClass("active")
      .find(".dropdown-list")
      .slideUp(150);
  });
  $("body").on("click", ".dropdown-select .label", function(e) {
    if (
      $(e.currentTarget)
        .closest(".dropdown-select")
        .hasClass("active")
    ) {
      $(e.currentTarget)
        .closest(".dropdown-select")
        .removeClass("active")
        .find(".dropdown-list")
        .slideUp(150);
    } else {
      $(".dropdown-select").removeClass("active");
      $(".dropdown-list").slideUp(150);
      $(e.currentTarget)
        .closest(".dropdown-select")
        .addClass("active")
        .find(".dropdown-list")
        .slideDown(150);
    }
  });
  $("body").on("click", ".dropdown-list > li", function(e) {
    if ($(e.currentTarget).hasClass("noclose")) return;
    $(e.currentTarget)
      .closest(".dropdown")
      .removeClass("active")
      .find(".dropdown-list")
      .slideUp(150);
  });
  $("body").on("click", ".dropdown-select .dropdown-list li", function(e) {
    var text, value;
    value = $(e.currentTarget).attr("data-option");
    if (
      $(e.currentTarget)
        .closest(".dropdown-select")
        .hasClass("submit-us")
    ) {
      text = value.length
        ? "Submit as " + $(e.currentTarget).text()
        : $(e.currentTarget).text();
      text =
        text
          .toLowerCase()
          .charAt(0)
          .toUpperCase() + text.toLowerCase().substr(1);
    } else {
      text = $(e.currentTarget).text();
    }
    $(e.currentTarget)
      .closest(".dropdown-list")
      .find("li")
      .removeClass("selected");
    $(e.currentTarget).addClass("selected");
    $(e.currentTarget)
      .closest(".dropdown-select")
      .attr("data-value", value)
      .find(".label span")
      .text(text);
    $(e.currentTarget)
      .closest(".dropdown-select")
      .removeClass("active");
    $(e.currentTarget)
      .closest(".dropdown-list")
      .slideUp(150);
    $(e.currentTarget)
      .closest(".dropdown-select")
      .find('select option[value="' + value + '"]')
      .prop("selected", true);
    $(e.currentTarget).closest('.dropdown-select').find('select').trigger('change');
  });

  // End Dropdown & dropdown selects

  /* ===========================================================
                      Ticket details
  ============================================================*/
  $(".ticket__replies_link").click(function(e) {
    if ($(e.currentTarget).hasClass("visible")) {
      $(e.currentTarget).removeClass("visible");
      $(".ticket__replies_list").slideUp(150);
    } else {
      $(".ticket__replies_list").slideDown(150);
      $(e.currentTarget).addClass("visible");
    }
  });

  // Ticket upload file
  var ticketFiles = [];
  $('.block--attach input[type="file"]').change(function(e) {
    for (i = 0; i < e.target.files.length; i++) {
      ticketFiles.push(e.target.files[i]);
      var extension =
        "." +
        e.target.files[i].name.split(".")[
          e.target.files[i].name.split(".").length - 1
        ];
      var name = "";
      for (n = 0; n < e.target.files[i].name.split(".").length; n++) {
        if (n < e.target.files[i].name.split(".").length - 1) {
          name += e.target.files[i].name.split(".")[n];
        }
      }
      if (name.length > 16)
        name =
          name.slice(0, 10) + "..." + name.slice(name.length - 8, name.length);
      var label =
        "<div><span>" +
        name +
        extension +
        '</span><i><svg class="icon icon-close"><use xlink:href="./img/sprite.svg#icon-close"></use></svg></i></div>';
      $(".block--attach-list").append(label);
      $(".block--attach-list div").each(function(i, el) {
        $(el).attr("data-i", i);
      });
    }
  });
  $("body").on("click", ".block--attach-list div i", function(e) {
    var i = Number(
      $(e.target)
        .closest("div")
        .attr("data-i")
    );
    ticketFiles.splice(i, 1);
    $(e.currentTarget)
      .closest("div")
      .slideUp(150, function() {
        $(e.currentTarget)
          .closest("div")
          .remove();
        $(".block--attach-list div").each(function(i, el) {
          $(el).attr("data-i", i);
        });
      });
    console.log(ticketFiles);
  });

  $(".accordion-title").click(function(e) {
    if (
      $(e.currentTarget)
        .closest(".accordion")
        .hasClass("visible")
    ) {
      $(e.currentTarget)
        .closest(".accordion")
        .find(".accordion-body")
        .slideUp(150);
      $(e.currentTarget)
        .closest(".accordion")
        .removeClass("visible");
    } else {
      $(e.currentTarget)
        .closest(".accordion")
        .find(".accordion-body")
        .slideDown(150);
      $(e.currentTarget)
        .closest(".accordion")
        .addClass("visible");
    }
  });

  /* ===========================================================
                          Create ticket
  ============================================================*/
  if ( $.isFunction($.fn.datepicker) ) {
    $(".datepicker").datepicker({
      language: "en",
      position: "right bottom",
      autoClose: true,
      onSelect: function(formattedDate, date, inst) {
        if (formattedDate.length) {
          inst.$el
              .parent()
              .parent()
              .find('.calendar--value').fadeIn(150).find('span').text(formattedDate);
        }
      },
      onHide: function(inst, animationCompleted) {
        $(".ticket-create .param.calendar button").removeClass("active");
      }
    });
  } /* End if datepicker */
  $(".ticket-create .param.calendar button").click(function(e) {
    $(this).addClass("active");
    $(this).parent().find('.datepicker')
      .data("datepicker")
      .show();
  });
  $(".ticket-create .param.calendar .close").click(function(e) {
    $(this).parent().parent()
        .find('.calendar--button')
        .find('.datepicker')
        .data("datepicker")
        .clear();
    $(".ticket-create .param.calendar .calendar--value").fadeOut(
      150,
      function() {
        $(this)
          .find("span")
          .text("");
      }
    );
  });
  $('[data-action="create-ticket"]').click(function(e) {
    $("body").addClass("noscroll");
    $(".right-bar.ticket-create").fadeIn(150);
  });

  /* ===========================================================
                            Tooltyps
  ============================================================*/
  $("body").on("mouseenter", ".tooltype", function(e) {
    $(this)
      .find(".tooltype__content")
      .fadeIn(150);
  });
  $("body").on("mouseleave", ".tooltype", function(e) {
    $(this)
      .find(".tooltype__content")
      .fadeOut(150);
  });
  /* ===========================================================
                            start Customer help
  ============================================================*/
  $(".tabbed__head_tabs li").click(function(e) {
    var target = $(this).attr("data-link");
    $(".tabbed__head_tabs li").removeClass("current");
    $(this).addClass("current");
    $(".tabbed__tabs .tabbed__tabs_tab").removeClass("is-visible");
    $(".tabbed__tabs [data-tab=" + target + "]").addClass("is-visible");
  });
  $(".btn-toggler").click(function(e) {
    $(this)
      .closest(".params--block")
      .find(".accordion-body")
      .slideToggle();
    $(this).toggleClass("is-opened");
  });

  // Never allow typing in dropdowns
  $('.selectize-input input').prop('readonly', 'true');
});

window.onload = function() {
  $("#loader").fadeOut(150);
};

function escapeHtml(html){
  var text = document.createTextNode(html);
  var p = document.createElement('p');
  p.appendChild(text);
  return p.innerHTML;
}