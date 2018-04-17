$(document).ready(function () {

	$('.h-menu').on('click', function (e) {
		e.preventDefault();

		var container = $('.h-menu');

		$('.h-menu__block', container).toggleClass('h-menu__open');
		$('.h-menu__text', container).toggleClass('h-menu__text--black');
		$('.h-menu__content').toggleClass('h-menu__content--open');
	});

	//slider

	// slider back images 

	var browsing = function (container, activeSlide) {
		var showWindow = container.parents().find('.slider-bg'),
			backImg = activeSlide.find('.slider__img').attr('src');

		showWindow.css('background', 'url(' + backImg + ') no-repeat');
		showWindow.css('backgroundSize', 'cover');

	}

	//click ruls btn reviews slider

	$('.slider__controls').on('click', function (event) {
		event.preventDefault();

		var $this = $(event.target),
			container = $this.parents().find('.slider'),
			items = $('.slider__item', container),
			activeItem = items.filter('.slider__item--active');

			console.log($this);

		var existedItem,
			edgeItem,
			reqItem;

		if ($this.hasClass('slider__btn-next')) {
			existedItem = activeItem.next();
			edgeItem = items.first();
			console.log($this);
		}

		if ($this.hasClass('slider__btn-prev')) {
			existedItem = activeItem.prev();
			edgeItem = items.last();
		}

		reqItem = existedItem.length ? existedItem.index() : edgeItem.index();

		moveSlide(container, reqItem);
		browsing(container, activeItem);

	});

	//searh number slid and activ slide

	var moveSlide = function (container, slideNum) {

		var items = container.find('.slider__item'),
			activeSlide = items.filter('.slider__item--active'),
			reqItem = items.eq(slideNum),
			reqIndex = reqItem.index(),
			list = container.find('.slider__list'),
			dur = 500;

		if (reqItem.length) {
			list.animate({
				'left': -reqIndex * 100 + '%',
			}, dur, function () {
				activeSlide.removeClass('slider__item--active');
				reqItem.addClass('slider__item--active');
			});
		}
	};

});