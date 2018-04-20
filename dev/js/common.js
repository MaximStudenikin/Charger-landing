$(document).ready(function () {

	$('.h-menu').on('click', evenet => {
		e.preventDefault();

		const container = $('.h-menu');

		$('.h-menu__block', container).toggleClass('h-menu__open');
		$('.h-menu__text', container).toggleClass('h-menu__text--black');
		$('.h-menu__content').toggleClass('h-menu__content--open');
	});

	//parallax

	var parallax = (function () {

		var decorativeElementsConatainer = $('.decorative-elemetns', )
		simbolBig = $('.decorative-elemetns__big-simbol', decorativeElementsConatainer),
			decorativeText = $('.decorative-elemetns__small-text', decorativeElementsConatainer);
		return {
			move: function (block, windowScroll, strafeAmount) {
				var strafe = windowScroll / -strafeAmount + '%';

				var style = block.style;

				style.top = strafe;
			},

			init: function (wScroll) {
				this.move(simbolBig, wScroll, 45);
			}
		}

	}());

	window.onscroll = function () {
		var wScroll = window.pageXOffset;

		parallax.init(wScroll);

		console.log(wScroll);
	}

	//scroll

	// const display = $('.maincontent'),
	// 	sections = $('section');

	// let inScroll = false;

	// const switchActivePointFixeMenu = sectionEq => {
	// 	$('.fixed-menu__item').eq(sectionEq).addClass('fixed-menu__item--active')
	// 		.siblings().removeClass('fixed-menu__item--active');
	// }

	// const perfTrans = sectionEq => {

	// 	if (inScroll) return

	// 	inScroll = true;

	// 	const position = (sectionEq * -100) + '%';

	// 	display.css({
	// 		'transform': `translate(0, ${position})`,
	// 		'-webkit-transform': `translate(0, ${position})`
	// 	})

	// 	sections.eq(sectionEq).addClass('section--active')
	// 		.siblings().removeClass('section--active');

	// 	setTimeout(() => {

	// 		inScroll = false;
	// 		switchActivePointFixeMenu(sectionEq);

	// 	}, 1300);

	// }

	// const difineSections = sections => {

	// 	const activeSection = sections.filter('.section--active');

	// 	return {

	// 		activeSection,
	// 		nextSection: activeSection.next(),
	// 		prevSection: activeSection.prev()

	// 	}

	// }

	// $('.wrap').on('wheel', evenet => {

	// 	const deltaY = evenet.originalEvent.deltaY,
	// 		section = difineSections(sections);


	// 	if (deltaY > 0 && section.nextSection.length) { //scroll down
	// 		perfTrans(section.nextSection.index());
	// 	}

	// 	if (deltaY < 0 && section.prevSection.length) { //scroll up
	// 		perfTrans(section.prevSection.index());
	// 	}

	// });

	// $(document).on('keydown', event => {

	// 	const section = difineSections(sections);

	// 	if (inScroll) return

	// 	switch (event.keyCode) {
	// 		case 40: //up

	// 			if (!section.nextSection.length) return
	// 			perfTrans(section.nextSection.index());
	// 			break;

	// 		case 38:  //down

	// 			if (!section.prevSection.length) return
	// 			perfTrans(section.prevSection.index());
	// 			break;

	// 	}

	// });

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