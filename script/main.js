/**
 * Created by futurus on 7/4/2014.
 */
$(function () {
    var insta = $('.instagram');
    var requests = insta.setCity([
        {
            name: 'New York City',
            search: { // NYC
                lat: 40.71427,
                lng: -74.00597,
                distance: 5000
            }
        },
        {
            name: 'London',
            search: {
                lat: 51.50853,
                lng: -0.12574,
                distance: 5000
            }

        },
        {
            name: 'Rio de Jainero',
            search: {
                lat: -22.90278,
                lng: -43.20750,
                distance: 5000
            }
        }
    ]);
    var existings = [];

    function listPhotos(photo) {
        var innerHtml = $('<img>')
            .addClass('instagram-image')
            .attr('src', photo.images.thumbnail.url)
            .attr('border', 2);

        if (existings.indexOf(photo.link) === -1) {
            existings.push(photo.link);
        } else {
            innerHtml
                .attr('border', 0);
        }

        innerHtml = $('<a>')
            .attr('target', '_blank')
            .attr('href', photo.link)
            .append(innerHtml);

        return $('<div>')
            .addClass('instagram-photoholder')
            .attr('style', "display: inline;")
            .attr('id', photo.id)
            .append(innerHtml);
    }

    function instagramCity(id, city) {
        var cityHtml = $('<div>')
            .addClass('instagram-cityholder')
            .attr('id', id);

        $.each(city.data, function(i, photo) {
            cityHtml.append(listPhotos(photo));
        });

        $(this).append(cityHtml);
    }

    insta.on('done', function(event, response) {
        var that = this;
        var newPhotos = [];

        $.each(response.out, function(key, value) {
            $.each(value.data, function(i, p) {
                newPhotos.push(p.link);
            });

            instagramCity.call(that, key, value);
        });

        for (var i = 0; i < existings.length; i++) {
            if (newPhotos.indexOf(existings[i]) === -1) {
                existings.splice(i, 1);
            }
        }

        console.log(existings.length);
    });

    insta.instagram(requests);

    setInterval(function() {
        insta.empty();
        insta.instagram(requests);
    }, 5000);
});