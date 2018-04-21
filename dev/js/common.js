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

		var eContainer = $('.decorative-elemetns');

		return {
			move: function (block, windowScroll, strafeAmount) {

				var strafe = windowScroll / -strafeAmount + '%';
				var transformString = 'translate3d(0,' + strafe + ',0)';

				var style = block.style;

				style.transform = transformString;
				style.webkitTransform = transformString;
			},

			init: function (wScroll) {
				for (var index = 0; index < eContainer.length; ++index) {

					this.move(eContainer[index], wScroll, 45);

				}
			}
		}

	}());

	window.onscroll = function () {
		var wScroll = window.pageYOffset;

		parallax.init(wScroll);
	}

	//scroll

	//elements

	const display = $('.maincontent'),
		sections = $('section');

	let inScroll = false;

	const mobailDetect = new MobileDetect(window.navigator.userAgent);
	const isMobail = mobailDetect.mobile();

	// cheger active point menu 

	const switchActivePointFixeMenu = sectionEq => {
		$('.fixed-menu__item').eq(sectionEq).addClass('fixed-menu__item--active')
			.siblings().removeClass('fixed-menu__item--active');
	}

	//scroll logick

	const perfTrans = sectionEq => {

		if (inScroll) return

		inScroll = true;

		const position = (sectionEq * -100) + '%';

		display.css({
			'transform': `translate(0, ${position})`,
			'-webkit-transform': `translate(0, ${position})`
		})

		sections.eq(sectionEq).addClass('section--active')
			.siblings().removeClass('section--active');

		setTimeout(() => {

			inScroll = false;
			switchActivePointFixeMenu(sectionEq);

		}, 1300);

	}

	// serch section to scroll

	const difineSections = sections => {

		const activeSection = sections.filter('.section--active');

		return {

			activeSection,
			nextSection: activeSection.next(),
			prevSection: activeSection.prev()

		}

	}

	const scrollToSection = direction => {
		const section = difineSections(sections)

		if (inScroll) return
		
		if (direction === 'up' && section.nextSection.length) { //down
			perfTrans(section.nextSection.index())
		}

		if (direction === 'down' && section.prevSection.length) { //up
			perfTrans(section.prevSection.index())
		}

	}

	if (isMobail) {
		$(window).swipe({
			swipe: function (event, direction, distance, duration, fingerCount, fingerData) {

				scrollToSection(direction);

			}
		})
	};

	$('.wrap').on({
		wheel: evenet => {

			const deltaY = evenet.originalEvent.deltaY;
			// section = difineSections(sections);

			let direction = (deltaY > 0) ? 'up' : 'down';

			scrollToSection(direction);


			// if (deltaY > 0 && section.nextSection.length) { //scroll down
			// 	perfTrans(section.nextSection.index());
			// }

			// if (deltaY < 0 && section.prevSection.length) { //scroll up
			// 	perfTrans(section.prevSection.index());
			// }

		},

		touchmove: event => (event.preventDefault())
	});

	// nav scroll to section

	$('[data-scroll-to]').on('click touchstart', event => {

		event.preventDefault();

		const $this = $(event.currentTarget),
			sectionIndex = parseInt($this.attr('data-scroll-to'));

		perfTrans(sectionIndex);


	});

	//key scroll to section

	$(document).on('keydown', event => {

		const section = difineSections(sections);

		if (inScroll) return

		switch (event.keyCode) {
			case 40: //up

				if (!section.nextSection.length) return
				perfTrans(section.nextSection.index());
				break;

			case 38:  //down

				if (!section.prevSection.length) return
				perfTrans(section.prevSection.index());
				break;

		}

	});

	//slider

	// slider bg images 

	const browsing = function (container, activeSlide) {
		const showWindow = container.parents().find('.slider-bg'),
			backImg = activeSlide.find('.slider__img').attr('src');

		showWindow.css('background', `'url(${backImg}) no-repeat'`);
		showWindow.css('backgroundSize', 'cover');

	}

	//click ruls btn reviews slider

	$('.slider__controls').on('click touchstart', event => {
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

	//searh number slaid and activ slide

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