var $url = location.protocol + '//' + location.host + location.pathname;

/// * Google Analytics /
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-38615062-4', 'marine.gov.mo');
ga('send', 'pageview');
/// * end Google Analytics /

$(function () {
    setTimeout(function () {
        location.reload();
    }, 180000);

    ///* language /
    var $plang = $.query.get('lang');

    $('#id_lang span').each(function () {
        var $lang = $(this).attr('data-value');

        if ($plang == $lang) {
            $(this).addClass('active').siblings().removeClass('active');
        }
    });

    $("body").on("click", "#id_lang span", function (e) {
        var $lang = $(this).attr('data-value');
        var $port = $.query.get('port');        // only for realTimeSailing.aspx

        location.href = ($port != '') ? ($url + $.query.set('lang', $lang).set('port', '')) : ($url + $.query.set('lang', $lang));
    });
    ///* end language /

    ///* menu click /
    $("body").on("click", ".nav li a", function (e) {
        e.preventDefault();

        var href = $(this).attr('href');
        var $lang = $("#id_lang span.active").attr('data-value');

        var temp = (href.indexOf('?') > -1) ? '&lang=' : '?lang=';
        location.href = href + temp + $lang;
    });
});

(function ($) {
    $.fn.blockUI = function () {
        var $lang = $("#id_lang span.active").attr('data-value');
        var $message = '<h1 style="letter-spacing:5px;font-family:inherit;font-weight:bold">請稍後。。。</h1>';

        if ($lang == 'SC') {
            $message = '<h1 style="letter-spacing:5px;font-family:inherit;font-weight:bold">请稍后。。。</h1>';
        }
        else if ($lang == 'ENG') {
            $message = '<h1>Please wait...</h1>'
        }
        else if ($lang == 'PRT') {
            $message = '<h1>Por favor aguarde...</h1>';
        }

        $.blockUI({
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                'border-radius': '10px',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: 0.7,
                color: '#fff'
            },
            message: $message
        });
    };
})(jQuery);