$(document).ready(function () {

    $('.h__menu').on('click', function (e) {
        e.preventDefault();

        var container = $('.h__menu');

        $('.h__block', container).toggleClass('h__open');
        $('.h__text', container).toggleClass('h__text--black');
        $('.h__content').toggleClass('h__content--open');
    });

    //slider

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
                'left': -reqIndex * 100 + '%'
            }, dur, function () {
                activeSlide.removeClass('active__slide');
                reqItem.addClass('active__slide');
            });
        }

    };

    //click ruls btn welcome slider

    $('.controls').on('click', function (event) {
        event.preventDefault();

        var $this = $(event.target),
            cont = $this.parents().find('.slider'),
            browsing = $this.closest('.welcome--slider__bg', cont),
            items = $('[data-slider_item]', cont),
            activeItem = items.filter('.active__slide');

        var existedItem,
            edgeItem,
            reqItem;

        if ($this.hasClass('btn__next')) {
            existedItem = activeItem.next();
            var backImg = activeItem.find('.slider__img').attr('src');
            browsing.css('background', 'url(' + backImg + ') no-repeat');
            browsing.css('backgroundSize', 'cover');
            edgeItem = items.first();
        }

        if ($this.hasClass('btn__prev')) {
            cont = $this.parentsUntil().find('.slider');
            existedItem = activeItem.prev();
            var backImg = activeItem.find('.slider__img').attr('src');
            browsing.css('background', 'url(' + backImg + ') no-repeat');
            browsing.css('backgroundSize', 'cover');
            edgeItem = items.last();
        };

        reqItem = existedItem.length ? existedItem.index() : edgeItem.index();

        moveSlide(cont, reqItem);

    });

    //click ruls btn reviews slider

    $('.reviews__controls').on('click', function (event) {
        event.preventDefault();

        var $this = $(event.target),
            cont = $this.closest('.reviews__slider'),
            items = $('[data-slider_item]', cont),
            activeItem = items.filter('.active__slide');
        var existedItem,
            edgeItem,
            reqItem;

        if ($this.hasClass('btn__next')) {
            existedItem = activeItem.next();
            edgeItem = items.first();
        }

        if ($this.hasClass('btn__prev')) {
            existedItem = activeItem.prev();
            edgeItem = items.last();
        }

        reqItem = existedItem.length ? existedItem.index() : edgeItem.index();

        moveSlide(cont, reqItem);

    });

});