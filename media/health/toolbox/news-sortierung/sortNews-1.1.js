(function ($) {
	$.fn.sortNews = function (options) {
		var settings = $.extend({
			// Defaults
			date: "span.news-datum",
			image: null
		}, options);
		// Code start
		var month = {
			"januar": 1,
			"februar": 2,
			"märz": 3,
			"april": 4,
			"mai": 5,
			"juni": 6,
			"juli": 7,
			"august": 8,
			"september": 9,
			"oktober": 10,
			"november": 11,
			"dezember": 12
		};

		var items = $(this).toArray().sort(function (a, b) {
			d1 = $(a).find(settings.date).text().toLowerCase().trim().split(" ");
			d2 = $(b).find(settings.date).text().toLowerCase().trim().split(" ");
			if (!parseInt(d2[1])) return 1;
			if (!parseInt(d1[1])) return -1;
			if (d1[1] > d2[1]) return 1;
			if (d1[1] < d2[1]) return -1;
			if (month[d2[0]] == undefined) return 1;
			if (month[d1[0]] == undefined) return -1;
			if (month[d1[0]] > month[d2[0]]) return 1;
			if (month[d1[0]] < month[d2[0]]) return -1;
			if (!!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g)) return -1;
			return 1;
		});

		for (var i = 0; i < items.length; i++) {
			$(items[i]).prependTo($(items[i]).parent());
		}

		if (settings.image) {
			$(this).each(function () {
				if ($(this).find("img").length == 0) $(this).prepend(settings.image);
			});
		}
		// Code end
		return this;
	}
}(jQuery));