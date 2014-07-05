/**
 * Created by futurus on 7/4/2014.
 */
;(function ($) {
    function createAPIRequest(opts) {
        var data    = {},
            url     = 'https://api.instagram.com/v1';

        data = $.extend(data, {
            accessToken:    opts.accessToken,
            client_id:      opts.client_id,
            count:          opts.count,
            name:           opts.name
        });

        url += '/media/search';
        data = $.extend(data, opts.search);

        return {
            url:    url,
            data:   data
        };
    }

    $.fn.setCity = function(opts) {
        var requests = [];

        if (isArray(opts)) {
            if (opts.length > 0) {
                // create multiple requests
                for (var i = 0; i < opts.length; i++) {
                    requests.push(createAPIRequest($.extend(defaults, opts[i])));
                }
            } else {
                requests.push(createAPIRequest($.extend(defaults, {})));
            }
        }

        return requests;
    };

    $.fn.instagram = function (requests) {
        var that = this;
        var responses = [];

        for (i = 0; i < requests.length; i++) {
            $.ajax({
                dataType: "jsonp",
                url: requests[i].url,
                data: requests[i].data,
                success: function (response) {
                    responses.push(response);

                    if (responses.length === requests.length) {
                        that.trigger('done', {
                                out: responses
                            }
                        );
                    }
                }
            });
        }

        return this;
    };

    var defaults = {
        accessToken:    null,
        client_id:      '94d7a92b4d0b40468ecf0160a1096a5f',
        count:          10,
        search:         { // NYC
            lat: 40.71427,
            lng: -74.00597,
            distance: 5000
        }
    };

    function isArray(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    }
}(jQuery));