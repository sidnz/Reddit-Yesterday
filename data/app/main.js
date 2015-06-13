$(document).ready(function() {
    var previousScroll = 0;
    var url = location.protocol + "//" + location.host + location.pathname;
    var sortMode = "top";
    if (document.location.pathname.indexOf("/controversial") == 0) sortMode = "controversial";
    $(".drop-choices").prepend('<form method="POST" action="' + url + '"><input type="hidden" name="t" value="week"><input type="hidden" name="time" value="yesterday"><a href="' + url + "?t=week&time=yesterday&sort=" + sortMode + '&limit=100" class="choice ">yesterday</a></form>');
    var time = getURLParameter("time");
    if (time == "yesterday") {
        var prevStart = parseInt(getURLParameter("prevStart")) || 1;
        var start = parseInt(getURLParameter("start")) || parseInt(getURLParameter("prevStart") || 1);
        var i = 1;
        removeExtra();
        $('a[rel="nofollow next"]').attr("href", function(i, val) {
            val = val.replace(/&?start=([^&]$|[^&]*)/i, "");
            val = val.replace(/&?prevStart=([^&]$|[^&]*)/i, "");
            return val + "&start=" + last
        });
        $('a[rel="nofollow prev"]').attr("href", function(i, val) {
            val = val.replace(/&?start=([^&]$|[^&]*)/i, "");
            val = val.replace(/&?prevStart=([^&]$|[^&]*)/i,
                "");
            return val + "&prevStart=" + prevStart
        })
    }

    function getURLParameter(name) {
        return decodeURIComponent(((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)")).exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
    }
    $(window).scroll(function() {
        var currentScroll = $(this).scrollTop();
        if (currentScroll > previousScroll) removeExtra()
    });

    function removeExtra() {
        $('div[style="text-align: center; margin: 15px 5px; clear: both; font-size: 12px;"]').each(function() {
            $(this).remove()
        });
        if (time == "yesterday") {
            $("div.spacer div.dropdown span.selected").replaceWith('<span class="selected">yesterday</span>');
            i = start;
            $(".thing").each(function(index) {
                var $p = $(this).find("time").text();
                if ($p == "1 day") {
                    $(this).children("span").eq(0).replaceWith('<span class="rank">' + i + "</span>");
                    if (i >= last) last = i + 1;
                    i++
                } else $(this).remove()
            })
        }
    }
});
