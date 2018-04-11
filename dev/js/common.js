$(document).ready(function () {

    $('.h__menu').on('click', function (e) {
        e.preventDefault();

        const container = $('.h__menu');

        $('.h__block', container).toggleClass('h__open');
        $('.h__text', container).toggleClass('h__text--black');
        $('.h__content').toggleClass('h__content--open');
    });

    //slider

    //click ruls btn

    $('[data-class="slider__controls"]').on('click', function (event) {
        event.preventDefault();

        var $this = $(event.currentTarget),
            cont = $this.closest('[data-class="slider__teg"]'),
            items = $('[data-class="slider__item"]', cont),
            activeItem = items.filter('.active__slide');
        var existedItem,
            edgeItem,
            reqItem;

        if ($this.hasClass('controls__btn_next')) {
            existedItem = activeItem.next();
            edgeItem = items.first();
        }

        if ($this.hasClass('controls__btn_prev')) {
            existedItem = activeItem.prev();
            edgeItem = items.last();
        }

        reqItem = existedItem.length ? existedItem.index() : edgeItem.index();

        moveSlide(cont, reqItem);

    });

    //searh number slid and activ slide

    var moveSlide = function (cont, slideNum) {

        var items = cont.find('[data-class="slider__item"]'),
            activeSlide = items.filter('.active__slide'),
            reqItem = items.eq(slideNum),
            reqIndex = reqItem.index(),
            list = cont.find('[data-class="slider__list"]'),
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

});