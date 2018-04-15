$(document).ready(function () {

    $('.h__menu').on('click', function (e) {
        e.preventDefault();

        var container = $('.h__menu');

        $('.h__block', container).toggleClass('h__open');
        $('.h__text', container).toggleClass('h__text--black');
        $('.h__content').toggleClass('h__content--open');
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
            cont = $this.parents().find('[data-slider]'),
            items = $('[data-slider_item]', cont),
            activeItem = items.filter('.active__slide');
            
        var existedItem,
            edgeItem,
            reqItem;

        if ($this.hasClass('slider__btn_next')) {
            existedItem = activeItem.next();
            edgeItem = items.first();
        }

        if ($this.hasClass('slider__btn_prev')) {
            existedItem = activeItem.prev();
            edgeItem = items.last();
        }

        reqItem = existedItem.length ? existedItem.index() : edgeItem.index();

        moveSlide(cont, reqItem);
        browsing(cont, activeItem);

    });

    //searh number slid and activ slide

    var moveSlide = function (cont, slideNum) {

        var items = cont.find('[data-slider_item]'),
            activeSlide = items.filter('.active__slide'),
            reqItem = items.eq(slideNum),
            reqIndex = reqItem.index(),
            list = cont.find('[data-slider_list]'),
            dur = 500;

        if (reqItem.length) {
            list.animate({
                'left': -reqIndex * 100 + '%',
            }, dur, function () {
                activeSlide.removeClass('active__slide');
                reqItem.addClass('active__slide');
            });
        }
    };




    var container = $('[data-slider]'),
        activeItem = container.find('.active__slide');

    browsing(container, activeItem);



});