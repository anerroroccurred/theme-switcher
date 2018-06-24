(function ($) {

    $.widget("omicron.themeSwitcher", {

        options: {
            themes: [{
                url: 'css/themes/default.css',
                color: '#0091cf'
            }],
            storage: false
        },

        _create: function () {
            var options = this.options;
            var randId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
            this.element.addClass("themeSwitcher").attr("id", "themeSwitcher-" + randId).append('<button id="themeSwitcherToggleButton"><span class="spinner">&#9881;</span></button>');

            options.themes.forEach(function (element, i) {
                var optId = randId + '-opt-' + i;
                var checked = "";
                if (sessionStorage.getItem("themeSwitcher-" + window.location.hostname) == element.url) {
                    var checked = "checked";
                }
                this.element.append('<input type="radio" name="theme" id="' + optId +
                    '" data-color="' + element.color + '" data-url="' +
                    element.url + '" ' + checked + ' /><label for="' + optId + '" style="background-color:' +
                    element.color + '"></label>');
            }, this);

            var link = $("<link />", {
                id: "themeStylesheet",
                rel: "stylesheet",
                type: "text/css",
                href: sessionStorage.getItem("themeSwitcher-" + window.location.hostname) || "css/themes/default.css"
            });
            $('head').append(link);

            this.element.find('input[type=radio]').change(function () {
                $("html").find("#themeStylesheet").attr("href", $(this).attr("data-url"));
                if (options.storage) {
                    sessionStorage.setItem("themeSwitcher-" + window.location.hostname, $(this).attr("data-url"));
                }
            });

            this.element.find("#themeSwitcherToggleButton").on('click', function () {
                $(".themeSwitcher").toggleClass("in");
            });
        },

        _destroy: function () {
            this.element
                .removeClass("themeSwitcher")
                .html("");
        },
    });

}(jQuery));