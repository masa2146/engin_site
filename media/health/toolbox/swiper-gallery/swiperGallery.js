(function ($) {
	$.fn.swiperGallery = function (options) {
		var settings = $.extend({
			// Defaults
			imgSelector: "",
			background: "rgba(0, 0, 0, 0.7)",
			navButton: true,
			closeButton: true,
			slideDuration: 400,
			fadeDuration: 400,
			pagination: false,
			swiperOptions: {}
		}, options);

		// Code start

		var $gallery = $('<div class="swiper-gallery" style="background:' + settings.background + ';"><div class="swiper-container"><div class="swiper-wrapper"></div></div></div>'),
			$sourceImages = $(this).find("img" + settings.imgSelector),
			maxWidth = 0,
			maxHeight = 0,
			closed = true;

		$gallery.click(close);
		$("body").append($gallery);
		if (settings.navButton) {
			var $navButtons = $('<div class="swiper-button-prev"></div><div class="swiper-button-next"></div>');
			$gallery.find(".swiper-container").append($navButtons);
			$navButtons.click(function (e) {
				e.stopPropagation();
			});
		}
		if (settings.pagination) {
			var $pagination = $('<div class="swiper-pagination"></div>');
			$gallery.find(".swiper-container").append($pagination);
			$pagination.click(function (e) {
				e.stopPropagation();
			});
		}
		if (settings.closeButton) $gallery.append('<div class="close-button">&times;</div>');

		$sourceImages.each(function () {
			var $source = $(this);
			var $target = $('<div class="swiper-slide"><img src="' + $source.attr("src") + '" alt="" /></div>');

			$target.find("img").load(function () {
				$(this).data("width", this.naturalWidth);
				$(this).data("height", this.naturalHeight);

				maxWidth = Math.max(maxWidth, this.naturalWidth);
				maxHeight = Math.max(maxHeight, this.naturalHeight);
			}).click(function (e) {
				e.stopPropagation();
			});

			$gallery.find(".swiper-wrapper").append($target);
			$source.data("target", $target);
			$source.css("cursor", "pointer").click(function (e) {
				e.preventDefault();
				open(this);
			});
		});

		var swiper = new Swiper($gallery.find(".swiper-container").get(0), $.extend({
			speed: settings.slideDuration,
			prevButton: settings.navButton ? ".swiper-button-prev" : null,
			nextButton: settings.navButton ? ".swiper-button-next" : null,
			pagination: settings.pagination ? ".swiper-pagination" : null
		}, settings.swiperOptions));

		function open(img) {
			closed = false;
			var $target = $(img).data("target");
			var index = $gallery.find(".swiper-slide").index($target);

			$gallery.find(".swiper-container").css({
				width: maxWidth,
				height: maxHeight
			});

			$gallery.fadeIn(settings.fadeDuration);

			swiper.update();
			swiper.slideTo(index, 0);
		}

		function close() {
			$gallery.fadeOut(settings.fadeDuration, function () {
				closed = true;
			});
		}

		$(document).keydown(function (e) {
			if (!closed) {
				switch (e.which) {
					case 37:
						swiper.slidePrev();
						break;
					case 39:
						swiper.slideNext();
						break;
					case 27:
						close();
						break;
					default:
						return;
				}
				e.preventDefault();
			}
		});

		// Code end

		return this;
	}
}(jQuery));
