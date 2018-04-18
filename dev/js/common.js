$(document).ready(function () {

	$('.h-menu').on('click', evenet => {
		e.preventDefault();

		const container = $('.h-menu');

		$('.h-menu__block', container).toggleClass('h-menu__open');
		$('.h-menu__text', container).toggleClass('h-menu__text--black');
		$('.h-menu__content').toggleClass('h-menu__content--open');
	});

	// //scroll

	const display = $('.maincontent'),
		section = $('section');

	let inScroll = false;

	const switchActivePointFixeMenu = sectionEq =>{
		$('.fixed-menu__item').rq(sectionEq).addClass('fixed-menu__item--active')
		.siblings().removeClass('fixed-menu__item--active');
	} 

	const perfTrans = sectionEq => {

		if (inScroll) return

			inScroll = true;

			const position = (sectionEq * -100) + '%';

			display.css({
				'transform': `translate(0, ${position})`
			})

			section.eq(sectionEq).addClass('section--active')
				.siblings().removeClass('section--active');

			setTimeout(() => {
				inScroll = false;
				switchActivePointFixeMenu(sectionEq);
			}, 1300);

		}

	$('.wrap').on('wheel', evenet => {

		const deltaY = evenet.originalEvent.deltaY,
			activSection = section.filter('.section--active'),
			nextSection = activSection.next(),
			prevSection = activSection.prev();

		if (deltaY > 0 && nextSection.length) { //scroll down
			perfTrans(nextSection.index());
		}

		if (deltaY < 0 && prevSection.length) { //scroll up
			perfTrans(prevSection.index());
		}

	})

	//slider

	// slider back images 

	const browsing = function (container, activeSlide) {
		const showWindow = container.parents().find('.slider-bg'),
			backImg = activeSlide.find('.slider__img').attr('src');

		showWindow.css('background', `'url(${backImg}) no-repeat'`);
		showWindow.css('backgroundSize', 'cover');

	}

	//click ruls btn reviews slider

	$('.slider__controls').on('click', event => {
		event.preventDefault();

		const $this = $(event.target),
			container = $this.parents().find('.slider'),
			items = $('.slider__item', container),
			activeItem = items.filter('.slider__item--active');

		let existedItem,
			edgeItem,
			reqItem;

		if ($this.hasClass('slider__btn-next')) {
			existedItem = activeItem.next();
			edgeItem = items.first();
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

	const moveSlide = (container, slideNum) => {

		const items = container.find('.slider__item'),
			activeSlide = items.filter('.slider__item--active'),
			reqItem = items.eq(slideNum),
			reqIndex = reqItem.index(),
			list = container.find('.slider__list'),
			dur = 500;

		if (reqItem.length) {
			list.animate({
				'left': -reqIndex * 100 + '%',
			}, dur, () => {
				activeSlide.removeClass('slider__item--active');
				reqItem.addClass('slider__item--active');
			});
		}
	};

});