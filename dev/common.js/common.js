$(document).ready(function () {

	$('.h-menu').on('click', evenet => {
		evenet.preventDefault();

		const container = $('.h-menu');

		$('.h-menu__block', container).toggleClass('h-menu--open');
		$('.h-menu__text', container).toggleClass('h-menu__text--black');
		$('.h-menu__content').toggleClass('h-menu__content--open');
		$('.welcome__center').toggleClass('visuallyhidden');
	});

	//scroll

	//display

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

		sections.eq(sectionEq).addClass('section_active')
			.siblings().removeClass('section_active');

		setTimeout(() => {

			inScroll = false;
			switchActivePointFixeMenu(sectionEq);
			decorAnimation(sections);

		}, 1300);

	}

	// serch section to scroll

	const difineSections = sections => {

		const activeSection = sections.filter('.section_active');

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

			let deltaY = evenet.originalEvent.deltaY;

			let direction = (deltaY > 0) ? 'up' : 'down';

			scrollToSection(direction);

		},

		touchmove: event => (event.preventDefault()),


	});

	// nav scroll to section

	$('[data-scroll-to]').on('click touchstart', event => {

		event.preventDefault();

		const $this = $(event.currentTarget);

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

			case 38: //down

				if (!section.prevSection.length) return
				perfTrans(section.prevSection.index());
				break;

		}

	});

// 	var box = $('.big-photo');

// setTimeout(() => {
//   box.addClass('big-photo_show');  
// }, 1000);

// textarea

$('.textarea').on('mouseenter', (inScroll) => {

	const inScroll = false;

	return inScroll;

 });

	//animation for section

	const decorAnimation = sections =>
	{
		const
		activeSection = $(sections).filter('.section_active'),
		noActiveSection = activeSection.siblings(),

		decorating = $('.decorating', activeSection),
		noDecorating = $('.decorating', noActiveSection);

		decorating.addClass('decorating_animation');

		noDecorating.removeClass('decorating_animation');
	
	}

	decorAnimation(sections);
		
	//slider

	//click ruls button cover-slider slider

	$('.cover-slider__controls').on('click touchstart', event => {
		event.preventDefault();

		const $this = $(event.target),
			container = $this.parents().find('.cover-slider'),
			items = $('.cover-slider__item', container),
			activeItem = items.filter('.cover-slider__item_active');

		let existedItem,
			edgeItem,
			reqItem;

		if ($this.hasClass('slider-controls__button-next')) {
			existedItem = activeItem.next();
			edgeItem = items.first();
		}

		if ($this.hasClass('slider-controls__button-prev')) {
			existedItem = activeItem.prev();
			edgeItem = items.last();
		}

		reqItem = existedItem.length ? existedItem.index() : edgeItem.index();

		moveShowSlide(container, reqItem, activeItem);

	});

	//searh number slaid and activ slide Cover slider

	const moveShowSlide = (container, slideNum, activeItem) => {

		const 
			items = container.find('.cover-slider__item'),
			showWindow = container.parents().find('.cover-slider-viewport-bg'),
			backImg = activeItem.find('.cover-slider__img').attr('src'),
			reqItem = items.eq(slideNum);

		if (reqItem.length) {

			reqItem.addClass('cover-slider__item_active')
			.siblings().removeClass('cover-slider__item_active');

		}

		showWindow.css('background', 'url(' + '"' + backImg + '"' + ') no-repeat');
		showWindow.css('backgroundSize', 'cover');

		numberItem(container, items, reqItem)
	
	};

	//load bg images on load window for sliders

	$(window).one('load', (slideNum) =>{
		
		const 
			allCoverSlider = $('.cover-slider'),
			activeItem = $('.cover-slider__item_active', allCoverSlider),

			container = $('.text-slider'),
			activeSlide = $('.text-slider_active', container);
			

		moveShowSlide(allCoverSlider, slideNum, activeItem);
		moveSlide(container, activeSlide)

	});

	// numver pagination for cover slider

	const numberItem = (container, items, reqItem) => {
		
		const
		itemIndex = reqItem.index(),
		itemLength = items.length;

		const pagination = {
			numberPage:`<a class="cover-slider__pagination-item">${itemIndex + 1}</a>`,
			maxPage:`<a class="cover-slider__pagination-item">${itemLength}</a>`
		}

		$('[data-numberPage]','.cover-slider__pagination').html(pagination.numberPage);
		$('[data-maxPage]','.cover-slider__pagination').html(pagination.maxPage);
		
	};

	//click ruls button text-slider slider

	$('.text-slider__controls').on('click touchstart', event => {
		event.preventDefault();

		const $this = $(event.target),
			container = $this.parents().find('.text-slider'),
			items = $('.text-slider__item', container),
			activeItem = items.filter('.text-slider_active');

		let existedItem,
			edgeItem,
			reqItem;

		if ($this.hasClass('slider-controls__button-next')) {
			existedItem = activeItem.next();
			edgeItem = items.first();
		}

		if ($this.hasClass('slider-controls__button-prev')) {
			existedItem = activeItem.prev();
			edgeItem = items.last();
		}

		reqItem = existedItem.length ? existedItem.index() : edgeItem.index();

		moveSlide(container, reqItem);

	});

	//searh number slaid and activ slide

	const moveSlide = (container, slideNum) => {

		const 
			items = container.find('.text-slider__item'),
			activeSlide = items.filter('.text-slider_active'),
			reqItem = items.eq(slideNum),
			reqIndex = reqItem.index(),
			list = container.find('.text-slider__list'),
			showWindow = container.parents().find('.text-slider-viewport-bg'),
			backImg = activeSlide.find('.text-slider__img').attr('src'),
			dur = 500;

		if (reqItem.length) {
			list.animate({
				'left': -reqIndex * 100 + '%',
			}, dur, () => {
				activeSlide.removeClass('text-slider_active');
				reqItem.addClass('text-slider_active');
			});
		}

		showWindow.css('background', 'url(' + '"' + backImg + '"' + ') no-repeat');
		showWindow.css('backgroundSize', 'cover');
	};

});